/* tslint:disable:object-literal-sort-keys */

export = {
    url() {
        global.console.log('sign up url ' + this.api.launchUrl + '/sign_up');
        return this.api.launchUrl + '/sign_up';
    },
    elements: {
        emailError: '#emailError',
        emailInput: 'input[name=email]',
        error: 'p.error',
        form: '#signUpForm',
        loadingSpinner: 'div.navbar-header > img',
        nameError: '#nameError',
        nameInput: 'input[name=name]',
        passwordError: '#passwordError',
        passwordInput: 'input[name=password]',
        passwordConfirmError: '#passwordConfirmError',
        passwordConfirmInput: 'input[name=password_confirm]',
    },
};
