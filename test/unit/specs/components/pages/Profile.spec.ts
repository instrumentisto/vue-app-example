import Profile from 'components/pages/Profile.vue';
import Helper from '../../../Helper';

describe('components/pages/Profile.vue', () => {
    const testUser = {
        email: 'test@gmail.com',
        id: 1,
        name: 'Test',
    };
    const app = Helper.initApp(Profile, false);

    app.$store.state.users.authorized = testUser;
    app.$mount();

    const profileComponent = app.$children[0] as Profile;

    it('should have correct page title', () => {
        expect(profileComponent.title).to.equal(app.$i18n.t('profile.title'));
    });

    it('should render correct section title', () => {
        expect(app.$el.querySelector('h1.title').textContent).to.equal(app.$i18n.t('profile.title'));
    });

    it('should render correct user name', () => {
        expect(app.$el.querySelector('p#user_name').textContent).to.equal(testUser.name);
    });
});
