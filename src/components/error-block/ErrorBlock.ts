import Vue from 'vue';
import Component from 'vue-class-component';

/**
 * Describes error block component with error message, that visible
 * when error message is not empty.
 */
@Component({
    props: {
        error: '',
    },
})
export default class ErrorBlock extends Vue {
    // tslint:disable-line
}
