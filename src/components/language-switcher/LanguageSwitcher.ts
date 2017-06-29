import Vue from 'vue';
import Component from 'vue-class-component';
import { Mutation } from 'vuex-class';

import I18n from 'I18n';
import { SET_LOCALE } from 'store/root/mutations';


/**
 * Describes component, that displays language switcher bar.
 * Properties:
 * - containerClass: CSS class(es), that will be added to the
 * switcher container.
 */
@Component({
    props: {
        containerClass: '',
    },
})
export default class LanguageSwitcher extends Vue {

    /**
     * Commits chancing locale mutation of the root Vuex store.
     */
    @Mutation(SET_LOCALE)
    public setAppLocale:
        /**
         * @param locale    Locale key, that application state will be set for.
         */
        (locale: string) => void;

    /**
     * Returns list of locales, supported by application.
     *
     * @return   Array of locales, supported by application.
     */
    public get locales(): string[] {
        return I18n.locales;
    }

    /**
     * Calculates, if given locale is equals to the current
     * application locale.
     *
     * @param locale    Locale, that will be used in check condition.
     *
     * @return   Flag, that indicates if given locale is equals to the
     *           current application locale.
     */
    public isActive(locale: string): boolean {
        return (locale === this.$i18n.locale);
    }

    /**
     * Fires changing application locale by loading given locale dictionary
     * and updating all locale dependent components configuration.
     *
     * @param locale    Locale, which application locale will be changed to.
     */
    public change(locale: string): void {
        if (this.$i18n.locale === locale) {
            return;
        }

        I18n.loadLocaleData(locale).then(() => {
            this.$i18n.locale = locale;
            this.$validator.setLocale(locale);
            this.setAppLocale(locale);
        });
    }
}
