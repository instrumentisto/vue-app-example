import { NightWatchBrowser } from '../../types/nightwatch';

/**
 * Helper class for e2e tests.
 */
export default class Helper {

    /**
     * Executes before each spec and does required things of initiating
     * local storage etc.
     *
     * @param browser   NightWatch browser instance, that future tests
     *                  would work with.
     * @param done      Callback, that must be called after all required
     *                  actions were completed.
     */
    public static beforeEach(browser: NightWatchBrowser, done: () => void): void {
      browser
        .url(browser.launch_url)
        .execute((initialStorage) => {
          for (const key in initialStorage) {
            if (!initialStorage.hasOwnProperty(key)) {
              continue;
            }
            localStorage.setItem(key, JSON.stringify(initialStorage[key]));
          }
        }, [browser.globals.localStorage], (result) => {
          done();
        });
    }
}
