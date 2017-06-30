import { expect } from 'chai';
import Vue from 'vue';

import SignUp from 'components/pages/sign-up/SignUp.vue';

import Helper from 'unit/Helper';


describe('components/pages/SignUp.vue', () => {


    let app: Vue;
    let component: any;

    before(() => {
        return Helper.initApp(SignUp).then((vm: Vue) => {
            app = vm;
            component = app.$children[0] as any;
        });
    });


    describe('metaInfo()', () => {

        it('returns correct page title', () => {
            expect(component.metaInfo().title)
                .to.equal(app.$i18n.t('sign_up.title'));
        });

    });


    it('renders correct section title', () => {
        expect((app.$el.querySelector('h1.title') as any).textContent)
            .to.equal(app.$i18n.t('sign_up.title'));
    });


});
