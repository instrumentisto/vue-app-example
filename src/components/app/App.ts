import Vue from 'vue';
import Component from 'vue-class-component';
import { Store } from 'vuex';
import { Action, Getter, namespace } from 'vuex-class';

import { FETCH_ALL } from 'store/modules/user/actions';
import { TOTAL_COUNT } from 'store/modules/user/getters';
import RootState from 'store/root/state';

import Navbar from 'components/navbar/Navbar.vue';


const UserGetter = namespace('user', Getter);
const UserAction = namespace('user', Action);

/**
 * Describes base application component, that contains general properties
 * of all views and components.
 *
 * It also specifies base application template.
 */
@Component({
    components: {
        Navbar,
    },
})
export default class App extends Vue {

    /**
     * Returns total count of users from global Vuex store.
     *
     * It uses root Vuex getter under the hood.
     */
    @UserGetter(TOTAL_COUNT)
    public usersTotalCount: number;

    /**
     * Executes fetch all users action of the root Vuex store.
     */
    @UserAction(FETCH_ALL)
    public fetchAllUsers:
        /**
         * Executes fetch all users action of the root Vuex store.
         *
         * @return   Resolved promise with array of all users, that exist
         *           in the system.
         */
        () => Promise<object>;

    /**
     * Vue component 'created' hook, that executes when component instance
     * was created.
     */
    public created(): void {
        this.fetchAllUsers();
    }

    /**
     * Vue component 'preFetch' hook, that is used in SSR to do required
     * things with given Vuex store before page rendering.
     *
     * @param store     Vuex store, to perform actions on.
     *
     * @return   Resolved promise with array of all users, that exist
     *           in the system.
     */
    public preFetch(store: Store<RootState>): Promise<object[]> {
        return store.dispatch('user/' + FETCH_ALL);
    }
}
