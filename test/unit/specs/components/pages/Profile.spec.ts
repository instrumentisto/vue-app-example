import Vue from 'vue';

import I18n from '~i18n';
import Profile from '~components/pages/Profile.vue';

describe('components/pages/Profile.vue', () => {
    const i18n = I18n.init();
    const vm = new Vue({
        components: {
            test: Profile,
        },
        i18n,
        template: '<div><test></test></div>',
    }).$mount();

    const profileComponent = vm.$children[0];

    it('should have correct page title', () => {
        expect(profileComponent.title).to.equal(i18n.t('profile.title'));
    });

    it('should render correct section title', () => {
        expect(vm.$el.querySelector('h1.title').textContent).to.equal(i18n.t('profile.title'));
    });
});
