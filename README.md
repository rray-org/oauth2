# `@rray/oauth2`

A very simple OAuth2 implementation

## Global `fetch` expectation

Note: this package expects a global `fetch` to be set, which is present on newer Node.js versions.

It can be polyfilled with `node-fetch`, for example.

## Usage

```js
import { OAuth2 } from '@rray/oauth2'

// provides { full_auth_url, async auth(code) }
const oauth = OAuth2('google', { g_client_id, g_client_secret, g_redirect_uri })

server.get('/oauth', (req, res) => res.redirect(oauth.full_auth_url))

server.get('/oauth/callback', async (req, res) => {
  const userinfo = await oauth.auth(req.query.code)
  ...
})
```

## Providers support

Currently two providers have built-in support: `'google'` and `'yandex'`.

In order to use this with another provider, just pass in the corresponding provider object manually:

```js
const provider = { ... }
const oauth = OAuth2(provider, { client_id, client_secret, redirect_uri })
```

See [providers list](./providers.mjs) for the structure of the `provider` object.

## License

[MIT](./LICENSE)
