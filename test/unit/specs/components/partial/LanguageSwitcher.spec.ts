import { expect } from 'chai';
import Vue from 'vue';

import LanguageSwitcher from 'components/partial/LanguageSwitcher.vue';
import Helper from 'unit/Helper';

describe('components/partial/LanguageSwitcher.vue', () => {
    let app: Vue;
    let component: any;

    before(() => {
        return Helper.initApp(LanguageSwitcher).then((vm) => {
            app = vm;
            component = app.$children[0];
        });
    });

    it('should return valid languages list', () => {
        expect(component.locales)
            .to.be.an('array')
            .and.not.be.empty;
    });

    it('active language flag must be true for current language', () => {
        expect(component.isActive(app.$i18n.locale)).to.be.true;
    });
});
