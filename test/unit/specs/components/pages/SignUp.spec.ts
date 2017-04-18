import SignUp from 'components/pages/SignUp.vue';
import Helper from '../../../Helper';

describe('components/pages/SignUp.vue', () => {
    const app = Helper.initApp(SignUp);

    const signUpComponent = app.$children[0] as SignUp;

    it('should have correct page title', () => {
        expect(signUpComponent.title).to.equal(app.$i18n.t('sign_up.title'));
    });

    it('should render correct section title', () => {
        expect(app.$el.querySelector('h1.title').textContent).to.equal(app.$i18n.t('sign_up.title'));
    });
});
