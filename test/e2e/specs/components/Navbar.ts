/* tslint:disable:object-literal-sort-keys */

import { NightWatchBrowser, NightWatchClient, NightWatchPage } from '../../../../types/nightwatch'; // tslint:disable-line
import Helper from '../../Helper';
import Sizes from '../../Sizes';


export = {


    '@tags': ['components2'],

    'beforeEach': (browser: NightWatchBrowser, done: () => void) => {
        Helper.beforeEach(browser, done);
    },


    'Brand image height is 40px':
        (client: NightWatchClient) => {
            const loginPage: NightWatchPage = client.page.login();

            loginPage.navigate()
                .waitForElementVisible('#app', Helper.maxLoadingTime);

            loginPage.getElementSize(
                '@brandImg',
                (result) => {
                    client.assert.equal(
                        result.value.height,
                        Sizes.brandImg.height,
                    );
                },
            );
            client.end();
        },


};
