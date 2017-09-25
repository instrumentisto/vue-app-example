import 'vue';

declare module 'vue/types/vue' {
    interface Vue {
        validationErrors: any;
        $meta(): any;
    }
}
