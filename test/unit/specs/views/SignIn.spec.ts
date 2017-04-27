import { expect } from 'chai';
import Vue from 'vue';

import Helper from 'unit/Helper';
import SignIn from 'views/SignIn.vue';

describe('components/pages/SignIn.vue', () => {
    let app: Vue;
    let component: any;

    before(() => {
        return Helper.initApp(SignIn).then((vm) => {
             app = vm;
             component = app.$children[0];
        });
    });

    it('should have correct page title', () => {
        expect(component.title).to.equal(app.$i18n.t('sign_in.title'));
    });

    it('should render correct section title', () => {
        expect(app.$el.querySelector('h1.title').textContent).to.equal(app.$i18n.t('sign_in.title'));
    });
});
