import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const languages = ['en', 'ru', 'uk'],
    languagesPriority = [
        Vue.cookie.get('language'),
        navigator.language,
        'en'
    ];

for (let lang of languagesPriority) {
    if (languages.find(value => value === lang)) {
        Vue.config['lang'] = lang;
        break;
    }
}

for (let lang of languages) {
    // Put app starting language data to the bundle.
    // Other languages would be loaded by lazy load when they will be needed.
    let data = ((lang === Vue.config['lang']))
        ? require('../../assets/i18n/' + lang + '.json')
        : {};
    Vue['locale'](lang, data);
}
