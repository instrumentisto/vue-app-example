/* tslint:disable:object-literal-sort-keys */

import { NightWatchBrowser, NightWatchClient, NightWatchPage } from '../../../../types/nightwatch'; // tslint:disable-line
import Helper from '../../Helper';
import Sizes from '../../Sizes';


const ANIMATION_DURATION = 500;

export = {


    '@tags': ['components'],

    'beforeEach': (browser: NightWatchBrowser, done: () => void) => {
        Helper.beforeEach(browser, done);
    },


    'Main section width is 400px':
        (client: NightWatchClient) => {
            const loginPage: NightWatchPage = client.page.login();

            loginPage.navigate()
                .waitForElementVisible('#app', Helper.maxLoadingTime);

            loginPage.getElementSize(
                '@mainSection',
                (result) => {
                    client.assert.equal(
                        result.value.width,
                        Sizes.mainSection.width,
                    );
                },
            );
            client.end();
        },


    'Footer height is 52px':
        (client: NightWatchClient) => {
            const loginPage: NightWatchPage = client.page.login();

            loginPage.navigate()
                .waitForElementVisible('#app', Helper.maxLoadingTime);

            loginPage.getElementSize(
                '@footer',
                (result) => {
                    client.assert.equal(
                        result.value.height,
                        Sizes.footer.height,
                    );
                },
            );
            client.end();
        },


    'Animation start on navigation':
        (client: NightWatchClient) => {
            const loginPage: NightWatchPage = client.page.login();
            const signUpPage: NightWatchPage = client.page.sign_up();

            signUpPage.navigate()
                .waitForElementVisible('#app', Helper.maxLoadingTime);
            client.pause(ANIMATION_DURATION);
            let opacityBeforeLoad: number;
            let opacityOnLoad: number;
            let opacityAfterLoad: number;
            loginPage.getCssProperty(
                '@mainSection',
                'opacity',
                (result) => {
                    opacityBeforeLoad = result.value;
                    client.assert.equal(opacityBeforeLoad, 1);
                },
            );
            loginPage.navigate()
                .waitForElementVisible('#app', Helper.maxLoadingTime);
            client.pause(ANIMATION_DURATION * 0.1);
            loginPage.getCssProperty(
                '@mainSection',
                'opacity',
                (result) => {
                    opacityOnLoad = result.value;
                    client.assert.notEqual(opacityOnLoad, opacityBeforeLoad);
                },
            );
            client.pause(ANIMATION_DURATION);
            loginPage.getCssProperty(
                '@mainSection',
                'opacity',
                (result) => {
                    opacityAfterLoad = result.value;
                    client.assert.equal(opacityAfterLoad, opacityBeforeLoad);
                },
            );
            client.end();
        },


};
