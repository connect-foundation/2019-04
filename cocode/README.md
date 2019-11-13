# cocode

## usage

```json
"scripts": {
    "start": "webpack-dev-server --open",
    "watch": "webpack --watch",
    "build": "webpack --production",
    "build:dev": "webpack --develope",
    "precommit": "npm test & lint-staged",
    "prepush": "npm test",
    "test": "ls"
  }
```

-   `start` 개발용 서버를 실행합니다.
-   `build` 배포용 파일을 번들링합니다.

```javascript
entry : __dirname + '/src/index.js',
output : {
    path: __dirname + '/public',
    filename : 'bundle.js'
}
```

entry 파일은 /src/index.js 파일입니다. 해당파일에서
/src/app.js 파일을 body태그에 랜더링합니다.

webpack-dev-server를 실행한 경우 번들링된 파일을 생성하지 않습니다.
