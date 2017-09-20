import 'vue';

declare module 'vue/types/vue' {
    interface Vue {
        $ssrContext: any;
        $meta(): any;
    }
}
