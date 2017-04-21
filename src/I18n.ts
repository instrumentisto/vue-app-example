import { Validator } from 'vee-validate';
import Vue from 'vue';
import VueI18n from 'vue-i18n';

import store from 'store';

export default class I18n {
    public static init(languagesPriority: string[]): Promise<VueI18n> {
        languagesPriority.push(this.defaultLanguage);

        let startLanguage;
        for (const lang of languagesPriority) {
            if (this.languages[lang]) {
                startLanguage = lang;
                break;
            }
        }

        Vue.use(VueI18n);

        this.i18n = new VueI18n({
            locale: startLanguage,
            messages: this.languages,
        });

        return this.loadLocaleData(startLanguage).then((data) => {
            return this.i18n;
        });
    }

    public static loadLocaleData(locale: string): Promise<any> {
        store.state.loading = true;

        return System.import('~assets/i18n/' + locale + '.json').then((data) => {
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

    private static readonly defaultLanguage = 'en';
    private static readonly languages = {
        en: {},
        ru: {},
        uk: {},
    };
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
