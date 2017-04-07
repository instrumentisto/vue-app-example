import Vue = require('vue');

declare module 'vue/types/vue' {
    //noinspection TsLint
    interface Vue {
        $t(keypath: string, lang?: string);
    }
}
