# yago-frontend

## Project setup
```
yarn install
```

### Start application
```
vue serve
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

Please edit `src/main.js`

```javascript
let httpLink;
httpLink = new HttpLink({
  uri: 'http://localhost:3001/graphql',
})
```

Set `uri` to the Rails backend application
