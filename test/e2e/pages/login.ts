/* tslint:disable:object-literal-sort-keys */

export = {
    url() {
        global.console.log('login url ' + this.api.launchUrl + '/login');
        return this.api.launchUrl + '/login';
    },
    elements: {
        brandImg: '.navbar-brand img',
        emailInput: 'input[name=email]',
        error: 'p.error',
        footer: 'footer',
        form: '#signInForm',
        langSwitchLink: 'ul.navbar-right li:not(.active) a',
        langActiveLink: 'ul.navbar-right li.active a',
        mainSection: 'main > section',
        passwordInput: 'input[name=password]',
        title: 'h1.title',
    },
};
