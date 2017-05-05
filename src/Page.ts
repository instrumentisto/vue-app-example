import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';

/**
 * Describes base page component. All application pages (views) must
 * extend it.
 *
 * It provides functionality of page title.
 */
@Component
export default class Page extends Vue {

    /**
     * Title of the page. It must be extended by each page (view).
     */
    public title: string;

    /**
     * Vue component 'watcher' to watch for "title" property changes.
     * On each change it sets new title value to the document title.
     */
    @Watch('title')
    public titleChanged(newTitle: string): void {
        if ((process as any).browser) {
            document.title = newTitle;
        }
    }

    /**
     * Vue component 'mounted' hook, that executes when component is
     * mounted to the DOM.
     *
     * It sets application loading state to "false", because mounted event
     * means that component is already mounted and available for user.
     *
     * It also sets document title, based on component "title" property.
     */
    public mounted(): void {
        this.$store.state.loading = false;
        if ((process as any).browser) {
            document.title = this.title;
        }
    }

}
