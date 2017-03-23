import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const locales = {
    en: {
        data: require('../../assets/i18n/en.json'),
        is_default: true
    },
    ru: {},
    ua: {}
}

Object.keys(locales).forEach((lang) => {
    let locale = locales[lang]
    Vue['locale'](lang, locale.data ? locale.data : {}, () => {
        if (locale.is_default) {
            Vue.config['lang'] = lang
        }
    })
})

export default VueI18n
