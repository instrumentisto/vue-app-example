import { expect } from 'chai';
import Vue from 'vue';

import SignUp from 'components/pages/SignUp.vue';
import Helper from 'unit/Helper';

describe('components/pages/SignUp.vue', () => {
    let app: Vue;
    let component: any;

    before(() => {
        return Helper.initApp(SignUp).then((vm) => {
            app = vm;
            component = app.$children[0];
        });
    });

    it('should have correct page title', () => {
        expect(component.title).to.equal(app.$i18n.t('sign_up.title'));
    });

    it('should render correct section title', () => {
        expect(app.$el.querySelector('h1.title').textContent).to.equal(app.$i18n.t('sign_up.title'));
    });
});
