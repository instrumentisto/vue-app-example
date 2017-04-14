import Vue from 'vue';

import I18n from 'I18n';
import SignUp from 'components/pages/SignUp.vue';

describe('components/pages/SignUp.vue', () => {
    const i18n = I18n.init();
    const vm = new Vue({
        components: {
            test: SignUp,
        },
        i18n,
        template: '<div><test></test></div>',
    }).$mount();

    const signUpComponent = vm.$children[0];

    it('should have correct page title', () => {
        expect(signUpComponent.title).to.equal(i18n.t('sign_up.title'));
    });

    it('should render correct section title', () => {
        expect(vm.$el.querySelector('h1.title').textContent).to.equal(i18n.t('sign_up.title'));
    });

    it('should return empty class name for empty field', () => {
        expect(signUpComponent.fieldClassName(null)).to.be.empty;
    });
});
