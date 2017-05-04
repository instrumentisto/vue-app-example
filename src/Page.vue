<script lang="ts">
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
         * Specifies name of the page. It must be extended by each page,
         * if we want to show correct page title with i18n support.
         */
        public name: string;

        /**
         * Returns localized page title based on environment
         * and current page name.
         *
         * @return   Localized page title, that was calculated.
         */
        public get title(): string {
            const title = this.$t(this.name + '.title');
            if (process.browser) {
                document.title = title;
            }
            return title;
        }

        /**
         * Vue component 'watcher' to use title property.
         *
         * Title property will be reactive, only if it's used
         * in somewhere in the component.
         */
        @Watch('title')
        public titleChanged(): void {
            // tslint:disable-line
        }

        /**
         * Vue component 'mounted' hook, that executes when component is
         * mounted to the DOM.
         */
        public mounted(): void {
            this.$store.state.loading = false;
        }

    }
</script>
