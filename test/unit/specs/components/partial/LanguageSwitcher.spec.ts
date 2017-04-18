import LanguageSwitcher from 'components/partial/LanguageSwitcher.vue';
import Helper from '../../../Helper';

describe('components/partial/LanguageSwitcher.vue', () => {
    const app = Helper.initApp(LanguageSwitcher);

    const languageSwitcherComponent = app.$children[0];

    it('should return valid languages list', () => {
        expect(languageSwitcherComponent.languages)
            .to.be.an('array')
            .and.not.be.empty;
    });

    it('active language flag must be true for current language', () => {
        expect(languageSwitcherComponent.isActive(app.$i18n.locale)).to.be.true;
    });
});
