import Vue from 'vue';
import VueApollo from 'vue-apollo';

declare module 'vue/types/vue' {
    interface Vue {
        $ssrContext: any;
        $meta(): any;
    }
}

declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        apolloProvider?: VueApollo;
        apollo: any;
    }
}
