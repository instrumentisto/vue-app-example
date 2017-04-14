import Vue from 'vue';
import VueForm from 'vue-form';

export default class Validation {

    public static init() {
        const options = {
            validators: {
                'image-validator': (value, attrValue, vnode) => {
                    // return true to set input as $valid, false to set as $invalid
                    return value === 'custom';
                },
            },
        };

        Vue.use(VueForm, options);
    }
}
