# vue-app-example

PoC app to test [Vue.js](https://vuejs.org/) framework

### Getting Started

0. Install project dependencies:
```bash
yarn install
```

1. Add this line to your `hosts` file:
```
127.0.0.1	vue-app-example.dev
```

2. Build project for both client & server environments:
```bash
yarn build:dev
```

3. Build & run docker image using Docker Compose:
```bash
docker-compose up --build
```

Now you can open [http://vue-app-example.dev](http://vue-app-example.dev)
application in browser.

To test Server-Side Rendering, you can emulate search bot request:
```bash
curl --header "User-Agent: Googlebot" http://vue-app-example.dev/
```
or directly do request to Express server:
```bash
curl http://vue-app-example.dev:8080/
```

### Useful Resources for Beginners

- Core documentation: [Vue](https://vuejs.org/v2/guide/),
  [vue-router](https://router.vuejs.org/en/),
  [Vuex](https://vuex.vuejs.org/en/)
- [Vue components style guide](https://pablohpsilva.github.io/vuejs-component-style-guide)
- Vue + TS: [vue-class-component](https://github.com/vuejs/vue-class-component),
  [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator),
  [vuex-class](https://github.com/ktsn/vuex-class/)
- TypeScript modules: http://www.typescriptlang.org/docs/handbook/modules.html
- Yarn: https://yarnpkg.com/en/docs/usage
- Pug: https://pugjs.org/language/attributes.html
- Chai BDD: http://chaijs.com/api/bdd/
- VeeValidate plugin: http://vee-validate.logaretm.com/
- vue-i18n plugin: https://kazupon.github.io/vue-i18n/en/
- All Vue plugins catalog: https://github.com/vuejs/awesome-vue
- Vue dev tools Chrome extension: https://github.com/vuejs/vue-devtools

### TODO
- ~~[Stylus](http://stylus-lang.com/)~~
- ~~[Pug](https://pugjs.org/language/attributes.html)~~
- ~~Improve SSR by new guidelines from https://ssr.vuejs.org/en/~~
- ~~ESLint for `.js` files and improve TSLint settings~~
- ~~Improve TypeScript typings~~
- ~~Change npm to Yarn, remove Bower~~
- Docker + Makefile + Travis CI
- ~~Remove base view `Page` component~~
- Improve E2E specs
- Fix eslint hanging with v4.0 

### Future Roadmap

- GraphQL
- [vue-kindergarten](https://github.com/JiriChara/vue-kindergarten)
- [av-ts](https://github.com/HerringtonDarkholme/av-ts): https://herringtondarkholme.github.io/2016/10/03/vue2-ts2/
- https://github.com/rowanwins/vue-dropzone
- Keep an eye on Nuxt.js and HackerNews app
- Mobile:
  - https://habrahabr.ru/post/327494/
  - https://github.com/quasarframework/quasar
  - https://github.com/nolimits4web/Framework7
  - https://github.com/weexteam/weex-vue-framework

### Known Issues

- Rolling back HMR updates (**temporarily postponed**)
