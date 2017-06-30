import { expect } from 'chai';
import Vue from 'vue';

import SignIn from 'components/pages/sign-in/SignIn.vue';

import Helper from 'unit/Helper';


describe('components/pages/SignIn.vue', () => {


    let app: Vue;
    let component: any;

    before(() => {
        return Helper.initApp(SignIn).then((vm: Vue) => {
            app = vm;
            component = app.$children[0] as any;
        });
    });


    describe('metaInfo()', () => {

        it('returns correct page title', () => {
            expect(component.metaInfo().title)
                .to.equal(app.$i18n.t('sign_in.title'));
        });

    });


    it('renders correct section title', () => {
        expect((app.$el.querySelector('h1.title') as any).textContent)
            .to.equal(app.$i18n.t('sign_in.title'));
    });


});
