import { expect } from 'chai';

import Router from 'Router';


describe('Router.ts', () => {


    describe('constructor()', () => {

        it('correctly initializes vue-router plugin', () => {
            const router = new Router().instance;
            expect(router)
                .to.have.deep.property('options.routes');
        });

    });


});
