<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import { Watch } from 'vue-property-decorator';

    @Component
    export default class Page extends Vue {

        protected name: string;

        private get title(): string {
            const title = this.$t(this.name + '.title');
            if (process.browser) {
                document.title = title;
            }
            return title;
        }

        @Watch('title')
        private titleChanged() {
            //noinspection TsLint
        }

        private mounted(): void {
            this.$store.state.loading = false;
        }

    }
</script>
