import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const languages = ['en', 'ru', 'uk'],
    languagesPriority = [
        navigator.language,
        '', // TODO: get from cookie
        'en'
    ];

let startLang;

for (let lang of languagesPriority) {
    if (languages.find(value => value === lang)) {
        startLang = lang;
        break;
    }
}

for (let lang of languages) {
    // Bundle app starting language data to the build.
    // Other languages would be loaded by lazy load when they will be needed.
    let data = ((lang === startLang))
        ? require('../../assets/i18n/' + lang + '.json')
        : {};
    Vue['locale'](lang, data, () => {
        console.log('loaded', lang);
    });
}

Vue.config['lang'] = startLang;

export default VueI18n;
