## Registering provider

Make sure you register the provider inside `start/app.js` file.

```js
const providers = ["adonis-logger-logdna/providers/LogDnaProvider"];
```

## Usage

Add following in `config/app.js` file.

```javascript
logger:{
    ...,
    logdna: {
      driver: "logdna",
      key: Env.get("LOGDNA_KEY", ""),
      app: "app name",
      env: Env.get("NODE_ENV", "development"),
      name: "adonis-app",
      level: "info",
      allowEnv: ["production","testing"]
    }
}
```

Please also add `LOGDNA_KEY` in your `.env` file.
