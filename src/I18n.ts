import { Validator } from 'vee-validate';
import Vue from 'vue';
import VueI18n from 'vue-i18n';

import store from 'store';

export default class I18n {

    public static readonly defaultLocale = 'en';

    public static readonly locales = ['en', 'ru', 'uk'];

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

    public static loadLocaleData(locale: string): Promise<any> {
        store.state.loading = true;

        return System.import('~assets/i18n/' + locale + '.json').then((data: any) => {
            this.i18n.setLocaleMessage(locale, data);

            const validationDictionary = {};
            validationDictionary[locale] = {
                attributes: data.validation.attributes,
                messages: {},
            };
            for (const rule in data.validation.messages) {
                if (data.validation.messages.hasOwnProperty(rule)) {
                    validationDictionary[locale].messages[rule] = (field) => {
                        return data.validation.messages[rule];
                    };
                }
            }
            Validator.updateDictionary(validationDictionary);

            store.state.loading = false;

            return data;
        });
    }

    private static i18n: VueI18n = null;
}

if (module.hot) {
    module.hot.accept(['~assets/i18n/en.json', '~assets/i18n/ru.json', '~assets/i18n/uk.json'], () => {
        // TODO: implement hot reloading for language files
        // i18n.setLocaleMessage('en', require('~assets/i18n/en.json'));
        // i18n.setLocaleMessage('ru', require('~assets/i18n/ru.json'));
        // i18n.setLocaleMessage('uk', require('~assets/i18n/uk.json'));
        // console.log('hot reload', this, arguments);
    });
}
