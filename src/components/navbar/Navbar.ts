import Vue from 'vue';
import Component from 'vue-class-component';

import LanguageSwitcher from 'components/language-switcher/LanguageSwitcher.vue';
import LoadingSpinner from 'components/loading-spinner/LoadingSpinner.vue';
import HMRApi from 'HMRApi';

/**
 * Describes Bootstrap navigation bar.
 */
@Component({
    components: {
        LanguageSwitcher,
        LoadingSpinner,
    },
})
export default class Navbar extends Vue {

    /**
     * Checks for HMR updates and automatically applies them.
     */
    public checkHotUpdates(): void {
        try {
            module.hot.check(true, (err, updatedModules) => {
//                    console.log('check err', err);
//                    console.log('check modules', updatedModules);
            });
        } catch (e) {
//                console.log('check catch', e.toString());
        }
    }
}

if (HMRApi && module.hot) {
    HMRApi.install(Vue);
    if (!module.hot.data) {
        HMRApi.createRecord('Header', (Navbar as any).options);
    } else {
        HMRApi.reload('Header', (Navbar as any).options);
    }
}
