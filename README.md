# vue-app-example

PoC app to test [Vue.js](https://vuejs.org/) framework

### Getting Started

0. Install project dependencies:
```bash
npm install && bower install
```

1. Add this line to your `hosts` file:
```
127.0.0.1	vue-app-example.dev
```

2. Build project for both client & server environments:
```bash
npm run build:dev
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

- [Vue components style guide](https://pablohpsilva.github.io/vuejs-component-style-guide)
- Vue plugins catalog: https://github.com/vuejs/awesome-vue
- Chai BDD: http://chaijs.com/api/bdd/
- Form validation plugin: http://vee-validate.logaretm.com/
- Mocking Ajax requests in Unit-tests: http://matthiashager.com/blog/mocking-http-requests-with-vuejs
- Vue dev tools Chrome extension: https://github.com/vuejs/vue-devtools
- https://pugjs.org/language/attributes.html

### TODO
- [Stylus](http://stylus-lang.com/)
- [Pug](https://pugjs.org/language/attributes.html)
- https://ssr.vuejs.org/en/
- JS Linting
- Makefile
- npm-shrinkwrap
- Improve typings

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
