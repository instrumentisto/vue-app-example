<template>
    <ul :class="containerClasses">
        <li v-for="lang in languages" v-bind:class="{ active: isActive(lang) }">
            <a @click="changeLanguage(lang)" href="javascript:void(0)">{{ lang }}</a>
        </li>
    </ul>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';

    import I18n from 'I18n';

    @Component({
        props: {
            containerClasses: '',
        },
    })
    export default class LanguageSwitcher extends Vue {

        get languages(): string[] {
            return Object.keys(this.$i18n.messages);
        }

        private isActive(lang) {
            return (lang === this.$i18n.locale);
        }

        private changeLanguage(lang) {
            if (lang === this.$i18n.locale) {
                return;
            }

//            if (Object.keys(this.$i18n.getLocaleMessage(lang)).length > 0) {
//                return;
//            }

            fetch('/i18n/' + lang + '.json', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'get',
            }).then((res) => {
                return res.json();
            }).then((json) => {
                if (Object.keys(json).length === 0) {
                    return Promise.reject(new Error('locale empty !!'));
                } else {
                    this.$i18n.setLocaleMessage(lang, json);
                    this.$i18n.locale = lang;
                    Vue.cookie.set('language', lang);
                }
            });
        }
    }
</script>

<style scoped>
    ul > li > a {
        text-transform: uppercase;
    }
</style>
