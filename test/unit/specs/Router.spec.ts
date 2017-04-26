import Router from 'Router';

describe('Router.ts', () => {
    it('should correctly initialize vue-router plugin', () => {
        const router = new Router().instance;

        expect(router).to.have.deep.property('options.routes');
    });
});
