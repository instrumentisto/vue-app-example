import Vue = require("vue");

declare module "vue/types/vue" {
    interface Vue {
        $t(keypath: String, lang?: String);
    }
}
