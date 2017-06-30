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
        return Helper.initApp(Profile, false).then((vm: Vue) => {
            app = vm;
            app.$store.state.user.authorized = testUser;
            app.$mount();

            component = app.$children[0] as any;
        });
    });


    describe('metaInfo()', () => {

        it('returns correct page title', () => {
            expect(component.$metaInfo.title)
                .to.equal(app.$i18n.t('profile.title'));
        });

    });


    it('renders correct section title', () => {
        expect((app.$el.querySelector('h1.title') as any).textContent)
            .to.equal(app.$i18n.t('profile.title'));
    });


    it('renders correct user name', () => {
        expect((app.$el.querySelector('#userName') as any).textContent)
            .to.equal(testUser.name);
    });


});
