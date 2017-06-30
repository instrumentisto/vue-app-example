import Vue = require('vue');

declare module 'vue/types/vue' {
    interface Vue {
        $ssrContext: any;
        $meta(): any;
    }
}
