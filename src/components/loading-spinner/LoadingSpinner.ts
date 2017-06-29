import Vue from 'vue';
import Component from 'vue-class-component';
import { Getter } from 'vuex-class';

import { LOADING } from 'store/root/getters';


/**
 * Describes component, that shows loading indicator, when global
 * application loading state is activated.
 */
@Component
export default class LoadingSpinner extends Vue {

    /**
     * Returns application loading state.
     *
     * It uses root Vuex getter under the hood.
     */
    @Getter(LOADING)
    public isLoading: boolean;

}
