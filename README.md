# vue-app-example

PoC app to test [Vue.js](https://vuejs.org/) framework

## Getting Started

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

4. Open application in browser:
```bash
start http://vue-app-example.dev
```

5. To test Server-Side Rendering, you can do:
```bash
curl http://vue-app-example.dev:8080/
```
