import VeeValidate from 'vee-validate';
import Vue from 'vue';

export default class Validation {

    public static init() {
        Vue.use(VeeValidate, this.config);
    }

    private static readonly config = {
        errorBagName: 'validationErrors',
    };
}
