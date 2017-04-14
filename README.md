# vue-app-example

PoC app to test [Vue.js](https://vuejs.org/) framework

## Getting Started

1. Init database for [JSON API server](https://github.com/typicode/json-server):
```bash
cp .data/db.example.json .data/db.json
```

2. Build & run docker image using Docker Compose:
```
docker-compose up --build
```

3. Add this line to your `hosts` file:
```
127.0.0.1	mol-app-example.dev
```

4. Open application in browser:
```
start http://vue-app-example.dev
```
