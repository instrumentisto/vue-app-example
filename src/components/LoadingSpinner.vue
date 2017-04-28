<template>
  <img v-show="isLoading" src="~assets/img/loading_box.gif">
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import { Getter } from 'vuex-class';

    import { LOADING } from 'store/root/getters';

    @Component
    export default class LoadingSpinner extends Vue {

        @Getter(LOADING)
        private isLoading;

    }
</script>
