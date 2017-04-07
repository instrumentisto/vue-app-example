import Vue from 'vue';
import VueI18n from 'vue-i18n';

export default class I18n {

    public static readonly LANGUAGES = ['en', 'ru', 'uk'];

    private static readonly DEFAULT_LANGUAGE = 'en';

    public static init(languagesPriority: string[]): void {
        Vue.use(VueI18n);

        if (!languagesPriority.find(lang => lang === this.DEFAULT_LANGUAGE)) {
            languagesPriority.push(this.DEFAULT_LANGUAGE);
        }

        for (let lang of languagesPriority) {
            if (this.LANGUAGES.find(value => value === lang)) {
                Vue.config['lang'] = lang;
                break;
            }
        }

        for (let lang of this.LANGUAGES) {
            let data = ((lang === Vue.config['lang']))
                ? require('../../assets/i18n/' + lang + '.json')
                : {};
            Vue['locale'](lang, data);
        }
    }
}
