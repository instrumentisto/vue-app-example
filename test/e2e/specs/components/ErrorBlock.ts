/* tslint:disable:object-literal-sort-keys */

import { NightWatchBrowser, NightWatchClient, NightWatchPage } from '../../../../types/nightwatch'; // tslint:disable-line
import Helper from '../../Helper';


export = {


    '@tags': ['components'],

    'beforeEach': (browser: NightWatchBrowser, done: () => void) => {
        Helper.beforeEach(browser, done);
    },


    'Error message is not present default':
        (client: NightWatchClient) => {
            const loginPage: NightWatchPage = client.page.login();

            loginPage.navigate()
                .waitForElementVisible('#app', Helper.maxLoadingTime)
                .assert.hidden('@error');
            client.end();
        },


};
