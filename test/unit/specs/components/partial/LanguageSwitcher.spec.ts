import Vue from 'vue';

import I18n from 'I18n';
import LanguageSwitcher from 'components/partial/LanguageSwitcher.vue';

describe('components/partial/LanguageSwitcher.vue', () => {
    const i18n = I18n.init();
    const vm = new Vue({
        components: {
            test: LanguageSwitcher,
        },
        i18n,
        template: '<div><test></test></div>',
    }).$mount();

    const languageSwitcherComponent = vm.$children[0];

    it('should return valid languages list', () => {
        expect(languageSwitcherComponent.languages)
            .to.be.an('array')
            .and.not.be.empty;
    });

    it('active language flag must be true for current language', () => {
        expect(languageSwitcherComponent.isActive(i18n.locale)).to.be.true;
    });

    // it('should return empty class name for empty field', () => {
    //     expect(languageSwitcherComponent.fieldClassName(null)).to.be.empty;
    // });
});
