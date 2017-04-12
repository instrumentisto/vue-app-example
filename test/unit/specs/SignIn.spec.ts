import Vue from 'vue';

import I18n from '~i18n';
import SignIn from '~components/pages/SignIn.vue';

describe('SignIn.vue', () => {
    it('should render correct contents', () => {
        const vm = new Vue({
            components: {
                test: SignIn,
            },
            i18n: I18n.init(),
            template: '<div><test></test></div>',
        }).$mount();
        expect(vm.$el.querySelector('h1').textContent).to.equal('Sign In');
    });
});
