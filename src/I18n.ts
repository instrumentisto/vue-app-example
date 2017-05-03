import { Validator } from 'vee-validate';
import Vue from 'vue';
import VueI18n from 'vue-i18n';

import store from 'store';

/**
 * Describes internationalization logic of the application.
 * Uses vue-i18n plugin with external locale resources behind the hood.
 */
export default class I18n {

    /**
     * Default application locale.
     * It's used as fallback locale when requested one is not available.
     */
    public static readonly defaultLocale: string = 'en';

    /**
     * Locales list, supported by application.
     */
    public static readonly locales: string[] = ['en', 'ru', 'uk'];

    /**
     * Initialize vue-i18n plugin with given priority of locales.
     * We take each locale by priority, and trying to find it in supported
     * locales list.
     *
     * @param priority   Priority array of locales.
     *
     * @returns     Resolved promise with initialized vue-i18n plugin instance.
     */
    public static init(priority: string[]): Promise<VueI18n> {
        priority.push(this.defaultLocale);

        let startLocale;
        for (const locale of priority) {
            if (this.locales.find((value) => value === locale)) {
                startLocale = locale;
                break;
            }
        }

        Vue.use(VueI18n);

        const messages = {};
        for (const locale of this.locales) {
            messages[locale] = {};
        }

        this.i18n = new VueI18n({
            locale: startLocale,
            messages,
        });

        return this.loadLocaleData(startLocale).then(() => {
            return this.i18n;
        });
    }

    /**
     * Loads locale data and updates vue-i18n and vee-validate plugins
     * dictionaries with it.
     *
     * @param locale    Locale, to load data for.
     *
     * @returns     Resolved promise with locale data.
     */
    public static loadLocaleData(locale: string): Promise<any> {
        store.state.loading = true;

        return System.import('~assets/i18n/' + locale + '.json')
            .then((data: any) => {
                this.i18n.setLocaleMessage(locale, data);

                const validationDictionary = {};
                validationDictionary[locale] = {
                    attributes: data.validation.attributes,
                    messages: {},
                };
                for (const rule in data.validation.messages) {
                    if (data.validation.messages.hasOwnProperty(rule)) {
                        validationDictionary[locale].messages[rule] =
                            (field, value) => {
                                switch (rule) {
                                  case 'min':
                                    return data.validation.messages[rule]
                                        .replace('{value}', value);
                                  default:
                                    return data.validation.messages[rule];
                                }
                            };
                    }
                }
                Validator.updateDictionary(validationDictionary);

                store.state.loading = false;

                return data;
            });
    }

    /**
     * Instance of initialized vue-i18n plugin.
     */
    private static i18n: VueI18n = null;
}
