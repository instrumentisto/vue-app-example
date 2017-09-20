vue-app-example
=====================

[![Build Status](https://travis-ci.org/instrumentisto/vue-app-example.svg?branch=master)](https://travis-ci.org/instrumentisto/vue-app-example)

PoC app to test [Vue.js](https://vuejs.org/) framework



## How to dev

Use `docker-compose` to boot up [dockerized environment](docker-compose.yml)
for development:
```bash
docker-compose up

# or with Yarn
yarn start
```

To resolve all project dependencies use docker-wrapped command
from [`Makefile`][1].
```bash
make deps

# or with Yarn
yarn install
```

To build both client and server bundles use docker-wrapped command
from [`Makefile`][1]:
```bash
make build

# or specify concrete target
make build target=client
make build target=server

# or produce production-ready bundles with minified assets
make build env=production

# or with Yarn
yarn build:client
yarn build:server
yarn build:all
yarn build:all --production
```

To lint TypeScript/JavaScript sources you should use docker-wrapped command
from [`Makefile`][1]:
```bash
make lint

# or with Yarn
yarn lint
```

To run tests or generate project documentation use docker-wrapped commands
from [`Makefile`][1]:
```bash
make test
make docs

# or concrete tests
make test.unit
make test.e2e start-app=yes
make test.docker

# or with Yarn
yarn test:unit
yarn test:e2e
yarn test
yarn docs
```

To make docker image (from project distribution) use docker-wrapped commands 
from [`Makefile`][1]: 
```bash
make dist && make docker.image
```

To open [http://vue-app-example.dev](http://vue-app-example.dev)
application in browser add lines to your `hosts` file:
```
127.0.0.1	vue-app-example.dev
127.0.0.1	api.vue-app-example.dev
```

To test Server-Side Rendering, you can emulate search bot request:
```bash
curl --header "User-Agent: Googlebot" http://vue-app-example.dev/
```
or directly do request to Express server:
```bash
curl http://vue-app-example.dev:8080/
```

#### Notable moments

- If you change project files layout, make sure that project builds as expected
  via `make build` and project distribution is formed correctly via `make dist`.
- All project dependencies should be declared with [Yarn][3]. In other words,
  using [NPM][4] or [Bower][5] is __not allowed__.
- All project TypeScript and JavaScript sources must be written accordingly with
  [ECMAScript 2016 language specifications][6]. You can easily configure
  WebStorm to support it by following [this guide][7].
- If you don't use docker-wrapped commands, make sure that tools you use have
  the same version as in docker-wrapped commands. It's latest version, mainly.



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
- ~~Docker + Makefile + Travis CI~~
- ~~Remove base view `Page` component~~
- Improve E2E specs
- ~~Fix eslint hanging with v4.0~~ 
- ~~Test remove json-server from hosts~~ 

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





[1]: Makefile
[2]: package.json
[3]: https://yarnpkg.com/lang/en/
[4]: https://www.npmjs.com/
[5]: https://bower.io/
[6]: https://www.ecma-international.org/publications/standards/Ecma-262.htm
[7]: https://medium.com/@brandonaaskov/enabling-es6-syntax-support-in-webstorm-48e22956ecfd
