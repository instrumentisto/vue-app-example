import SignIn from 'components/pages/SignIn.vue';
import Helper from '../../../Helper';

describe('components/pages/SignIn.vue', () => {
    const app = Helper.initApp(SignIn);

    const signInComponent = app.$children[0] as SignIn;

    it('should have correct page title', () => {
        expect(signInComponent.title).to.equal(app.$i18n.t('sign_in.title'));
    });

    it('should render correct section title', () => {
        expect(app.$el.querySelector('h1.title').textContent).to.equal(app.$i18n.t('sign_in.title'));
    });
});
