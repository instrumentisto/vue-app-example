import SignIn from 'components/pages/SignIn.vue';
import Helper from 'unit/Helper';

describe('components/pages/SignIn.vue', () => {
    let app;
    let component: SignIn;

    before(() => {
        return Helper.initApp(SignIn).then((vm) => {
             app = vm;
             component = app.$children[0];
        });
    });

    it('should have correct page title', () => {
        expect(component.title).to.equal(app.$i18n.t('sign_in.title'));
    });

    it('should render correct section title', () => {
        expect(app.$el.querySelector('h1.title').textContent).to.equal(app.$i18n.t('sign_in.title'));
    });
});
