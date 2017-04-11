import Vue from 'vue';

import SignIn from '~components/pages/SignIn.vue';

describe('SignIn.vue', () => {
    it('should render correct contents', () => {
        /*const Constructor = Vue.extend(SignIn);
        const vm = new Constructor().$mount();
        expect(vm.$el.querySelector('.hello h1').textContent)
            .to.equal('Welcome to Your Vue.js App');*/

        var vm = new Vue({
            template: '<div><test></test></div>',
            components: {
                'test': SignIn
            }
        }).$mount()
        expect(vm.$el.querySelector('h2.red').textContent).toBe('Hello from Component A!')
    });
});
