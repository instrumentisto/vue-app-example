/* tslint:disable:object-literal-sort-keys */

import { NightWatchBrowser, NightWatchClient, NightWatchPage } from '../../../../types/nightwatch'; // tslint:disable-line
import Helper from '../../Helper';


export = {


    '@tags': ['components'],

    'beforeEach': (browser: NightWatchBrowser, done: () => void) => {
        Helper.beforeEach(browser, done);
    },


    'Show loading spinner when load new page':
        (client: NightWatchClient) => {
            const loginPage: NightWatchPage = client.page.login();
            const signUpPage: NightWatchPage = client.page.sign_up();

            loginPage.navigate()
                .waitForElementVisible('#app', Helper.maxLoadingTime);
            signUpPage.navigate()
                .waitForElementVisible('@loadingSpinner', Helper.maxLoadingTime)
                .waitForElementNotVisible(
                    '@loadingSpinner',
                    Helper.maxLoadingTime,
                );

            client.end();
        },


};
