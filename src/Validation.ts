import VeeValidate from 'vee-validate';
import Vue from 'vue';

/**
 * Describes vee-validate plugin configuration.
 */
export default class Validation {

    /**
     * Initialize vee-validate plugin with predefined configuration.
     */
    public static init() {
        Vue.use(VeeValidate, this.config);
    }

    /**
     * Configuration options of vee-validate plugins.
     *
     * More info: http://vee-validate.logaretm.com/index.html#configuration
     */
    private static readonly config = {
        errorBagName: 'validationErrors',
    };
}
