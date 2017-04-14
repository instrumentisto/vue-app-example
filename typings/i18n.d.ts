import Vue = require('vue');
import VueI18n from 'vue-i18n';

declare module 'vue/types/vue' {
    //noinspection TsLint
    interface Vue {
        $t(keypath: string, lang?: string);
    }
}

declare module 'vue/types/options' {
    //noinspection TsLint
    interface ComponentOptions<V extends Vue> {
        i18n?: VueI18n;
    }
}
