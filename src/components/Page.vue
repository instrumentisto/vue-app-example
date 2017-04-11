<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import { Watch } from 'vue-property-decorator';

    @Component
    export default class SignIn extends Vue {

        protected title: string = '';

        protected created(): void {
            document.title = this.title;
        }

        @Watch('title')
        titleChanged(val: string, oldVal: string) {
            console.log('titleChanged', oldVal, val);
        }

    }
</script>
