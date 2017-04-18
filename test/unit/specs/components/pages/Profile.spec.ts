import Profile from 'components/pages/Profile.vue';
import Helper from '../../../Helper';

describe('components/pages/Profile.vue', () => {
    const app = Helper.initApp(Profile);

    const profileComponent = app.$children[0] as Profile;

    it('should have correct page title', () => {
        expect(profileComponent.title).to.equal(app.$i18n.t('profile.title'));
    });

    it('should render correct section title', () => {
        expect(app.$el.querySelector('h1.title').textContent).to.equal(app.$i18n.t('profile.title'));
    });
});
