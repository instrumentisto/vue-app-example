import { expect } from 'chai';
import Vue from 'vue';

import LanguageSwitcher from 'components/language-switcher/LanguageSwitcher.vue'; // tslint:disable-line

import Helper from 'unit/Helper';


describe('components/partial/LanguageSwitcher.vue', () => {


    let app: Vue;
    let component: any;

    before(() => {
        return Helper.initApp(LanguageSwitcher).then((vm: Vue) => {
            app = vm;
            component = app.$children[0] as any;
        });
    });


    describe('locales()', () => {

        it('returns valid languages list', () => {
            return expect(component.locales)
                .to.be.an('array')
                .and.not.be.empty;
        });

    });


    describe('isActive()', () => {

        it('returns "true" for current app language', () => {
            return expect(component.isActive(app.$i18n.locale))
                .to.be.true;
        });

    });


});
