/* tslint:disable:object-literal-sort-keys */

import { NightWatchBrowser, NightWatchClient, NightWatchPage } from '../../../../types/nightwatch'; // tslint:disable-line
import Helper from '../../Helper';


export = {


    '@tags': ['components'],

    'beforeEach': (browser: NightWatchBrowser, done: () => void) => {
        Helper.beforeEach(browser, done);
    },


    'Change page lang on click other lang':
        (client: NightWatchClient) => {
            const loginPage: NightWatchPage = client.page.login();

            let prevTitle: string;
            let clickedLang: string;
            loginPage.getText(
                '@langSwitchLink',
                (result) => clickedLang = result.value,
            );
            loginPage.navigate()
                .waitForElementVisible('#app', Helper.maxLoadingTime)
                .getText('@title', (result) => prevTitle = result.value)
                .assert.containsText(
                    '@title',
                    client.globals.localeData.sign_in.title,
                )
                .click('@langSwitchLink', () => {
                    (loginPage.expect.element('@title') as any)
                        .text.to.not.equal(prevTitle);
                })
                .getText(
                    '@langActiveLink',
                    (result) => client.assert.equal(result.value, clickedLang),
                );
            client.end();
        },


};
