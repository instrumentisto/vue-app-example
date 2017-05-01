<template>
  <p v-show="error" class="error">{{ error }}</p>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';

    @Component({
        props: {
            error: '',
        },
    })
    export default class ErrorBlock extends Vue {
        // tslint:disable-line
    }
</script>
