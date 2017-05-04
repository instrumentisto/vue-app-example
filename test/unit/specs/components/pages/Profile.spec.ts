import { expect } from 'chai';
import Vue from 'vue';

import Profile from 'components/pages/profile/Profile.vue';
import Helper from 'unit/Helper';

describe('components/pages/Profile.vue', () => {
    const testUser = {
        email: 'test@gmail.com',
        id: 1,
        name: 'Test',
    };
    let app: Vue;
    let component: any;

    before(() => {
        return Helper.initApp(Profile, false).then((vm) => {
            app = vm;
            app.$store.state.user.authorized = testUser;
            app.$mount();

            component = app.$children[0];
        });
    });

    it('should have correct page title', () => {
        expect(component.title).to.equal(app.$i18n.t('profile.title'));
    });

    it('should render correct section title', () => {
        expect(app.$el.querySelector('h1.title').textContent).to.equal(app.$i18n.t('profile.title'));
    });

    it('should render correct user name', () => {
        expect(app.$el.querySelector('#userName').textContent).to.equal(testUser.name);
    });
});
