<template>
    <ul :class="containerClasses">
        <li v-for="locale in locales"
            v-bind:class="{ active: isActive(locale) }">
            <a @click="change(locale)" href="javascript:void(0)">
                {{ locale }}
            </a>
        </li>
    </ul>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import { Mutation } from 'vuex-class';

    import I18n from 'I18n';
    import { SET_LOCALE } from 'store/root/mutations';

    @Component({
        props: {
            containerClasses: '',
        },
    })
    export default class LanguageSwitcher extends Vue {

        @Mutation(SET_LOCALE)
        private setAppLocale;

        get locales(): string[] {
            return I18n.locales;
        }

        private isActive(locale) {
            return (locale === this.$i18n.locale);
        }

        private change(locale) {
            if (this.$i18n.locale === locale) {
                return;
            }

            I18n.loadLocaleData(locale).then(() => {
                this.$i18n.locale = locale;
                this.$validator.setLocale(locale);
                this.setAppLocale(locale);
            });
        }
    }
</script>

<style scoped>
    ul > li > a {
        text-transform: uppercase;
    }
</style>
