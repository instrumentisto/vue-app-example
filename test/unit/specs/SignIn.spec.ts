import Vue from 'vue';

import I18n from '~i18n';
import SignIn from '~components/pages/SignIn.vue';

describe('SignIn.vue', () => {
    const i18n = I18n.init();
    const vm = new Vue({
        components: {
            test: SignIn,
        },
        i18n,
        template: '<div><test></test></div>',
    }).$mount();

    const signInComponent = vm.$children[0];

    it('should render correct contents', () => {
        expect(signInComponent.title).to.equal(i18n.t('sign_in.title'));
        expect(vm.$el.querySelector('h1.title').textContent).to.equal(i18n.t('sign_in.title'));
    });
});
