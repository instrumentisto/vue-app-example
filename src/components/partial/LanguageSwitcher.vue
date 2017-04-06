<template>
    <ul :class="containerClasses">
        <li v-for="lang in locales" v-bind:class="{ active: isActive(lang) }">
            <a @click="setLocale(lang)" href="javascript:void(0)">{{ lang }}</a>
        </li>
    </ul>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';

    @Component({
        props: {
            containerClasses: ''
        }
    })
    export default class LanguageSwitcher extends Vue {

        isActive(lang) {
            return (lang === this['$lang']);
        }

        get locales() {
            let locales = [];
            Object.keys(this.$root['_$lang']['locales']).forEach((lang) => {
                locales.push(lang);
            });
            return locales;
        }

        setLocale(lang) {
            if (lang === this['$lang']) {
                return;
            }

            Vue.config['lang'] = lang;
            Vue.cookie.set('language', lang);

            if (Object.keys(Vue['locale'](lang)).length > 0) {
                return;
            }

            Vue['locale'](lang, function () {
//                self.loading = true
                return fetch('/i18n/' + lang + '.json', {
                    method: 'get',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then(function (res) {
                    return res.json();
                }).then(function (json) {
//                    self.loading = false
                    if (Object.keys(json).length === 0) {
                        return Promise.reject(new Error('locale empty !!'));
                    } else {
                        return Promise.resolve(json);
                    }
                });
            });
        }

    }
</script>

<style scoped>
    ul > li > a {
        text-transform: uppercase;
    }
</style>
