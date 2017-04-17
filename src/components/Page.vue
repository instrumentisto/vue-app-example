<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import { Watch } from 'vue-property-decorator';

    @Component
    export default class Page extends Vue {

        protected name: string;

        protected get title() {
            return this.$t(this.name + '.title');
        }

        @Watch('title')
        titleChanged(val: string, oldVal: string) {
            document.title = val;
        }

    }
</script>
