import Vue from 'vue';

import I18n from 'I18n';
import SignIn from 'components/pages/SignIn.vue';

describe('components/pages/SignIn.vue', () => {
    const i18n = I18n.init();
    const vm = new Vue({
        components: {
            test: SignIn,
        },
        i18n,
        template: '<div><test></test></div>',
    }).$mount();

    const signInComponent = vm.$children[0];

    it('should have correct page title', () => {
        expect(signInComponent.title).to.equal(i18n.t('sign_in.title'));
    });

    it('should render correct section title', () => {
        expect(vm.$el.querySelector('h1.title').textContent).to.equal(i18n.t('sign_in.title'));
    });

    it('should return empty class name for empty field', () => {
        expect(signInComponent.fieldClassName(null)).to.be.empty;
    });
});
