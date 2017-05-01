export default class Helper {
    public static beforeEach(browser, done) {
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
