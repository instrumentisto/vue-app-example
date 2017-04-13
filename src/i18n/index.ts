import Vue from 'vue';
import VueI18n from 'vue-i18n';

export default class I18n {
    public static init(languagesPriority?: string[]): VueI18n {
        if (!languagesPriority || languagesPriority.length === 0) {
            languagesPriority = [this.defaultLanguage];
        }

        Vue.use(VueI18n);

        let startLanguage;
        for (const lang of languagesPriority) {
            if (this.languages[lang]) {
                startLanguage = lang;
                break;
            }
        }

        if (!startLanguage) {
            startLanguage = this.defaultLanguage;
        }

        const i18n = new VueI18n({
            locale: startLanguage,
            messages: this.languages,
        });

        i18n.setLocaleMessage(startLanguage, require('~assets/i18n/' + startLanguage + '.json'));

        if (module.hot) {
            module.hot.accept(['~assets/i18n/en.json', '~assets/i18n/ru.json', '~assets/i18n/uk.json'], () => {
                i18n.setLocaleMessage('en', require('~assets/i18n/en.json'));
                i18n.setLocaleMessage('ru', require('~assets/i18n/ru.json'));
                i18n.setLocaleMessage('uk', require('~assets/i18n/uk.json'));
                // console.log('hot reload', this, arguments);
            });
        }

        return i18n;
    }

    private static readonly defaultLanguage = 'en';
    private static readonly languages = {
        en: {},
        ru: {},
        uk: {},
    };
}
