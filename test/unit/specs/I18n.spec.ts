import { expect } from 'chai';

import I18n from 'I18n';

describe('I18n.ts', () => {
    it('should correctly initialize vue-i18n plugin with english language', () => {
        return I18n.init(['en']).then((i18n) => {
            return expect(Object.keys(i18n.getLocaleMessage('en')))
                .to.be.an('array')
                .and.not.be.empty;
        });
    });

    it('should correctly initialize vue-i18n plugin with default language on empty priority list', () => {
        return I18n.init([]).then((i18n) => {
            return expect(Object.keys(i18n.getLocaleMessage(I18n.defaultLocale)))
                .to.be.an('array')
                .and.not.be.empty;
        });
    });

    it('should correctly initialize vue-i18n plugin with default language on not existing locale', () => {
        return I18n.init(['not_existing_language']).then((i18n) => {
            return expect(Object.keys(i18n.getLocaleMessage(I18n.defaultLocale)))
                .to.be.an('array')
                .and.not.be.empty;
        });
    });

    it('should correctly load existing locale data', () => {
        return I18n.loadLocaleData('en').then((data) => {
            return expect(data).to.have.deep.property('validation.messages');
        });
    });
});
