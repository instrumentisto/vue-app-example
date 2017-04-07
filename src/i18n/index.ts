import Vue from 'vue';
import VueI18n from 'vue-i18n';

export default class I18n {

    public static readonly LANGUAGES = ['en', 'ru', 'uk'];

    public static init(languagesPriority: string[]): void {
        Vue.use(VueI18n);

        if (!languagesPriority.find((lang) => lang === this.DEFAULT_LANGUAGE)) {
            languagesPriority.push(this.DEFAULT_LANGUAGE);
        }

        for (const lang of languagesPriority) {
            if (this.LANGUAGES.find((value) => value === lang)) {
                Vue.config.lang = lang;
                break;
            }
        }

        for (const lang of this.LANGUAGES) {
            const data = ((lang === Vue.config.lang))
                ? require('../../assets/i18n/' + lang + '.json')
                : {};
            Vue.locale(lang, data);
        }
    }

    private static readonly DEFAULT_LANGUAGE = 'en';
}
