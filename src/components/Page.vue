<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import { Watch } from 'vue-property-decorator';

    @Component
    export default class Page extends Vue {

        protected name: string;

        protected get title(): string {
            let title = this.$t(this.name + '.title');
            document.title = title;
            return title;
        }

        @Watch('title')
        titleChanged() { }

    }
</script>
