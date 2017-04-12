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
        return i18n;
    }

    private static readonly defaultLanguage = 'en';
    private static readonly languages = {
        en: {},
        ru: {},
        uk: {},
    };
}
