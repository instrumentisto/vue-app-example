export default class Helper {
    public static beforeEach(browser, done, path) {
      browser
        .url(browser.globals.devServerURL + path)
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
