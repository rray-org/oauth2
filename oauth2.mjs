import providers from './providers.mjs'

export const OAuth2 = (provider, config = {}) => {
  const info = Object.hasOwn(providers, provider) ? providers[provider] : provider
  const { client_id, client_secret, redirect_uri } = config

  if (typeof info !== 'object') throw new TypeError('Invalid provider')
  if (![client_id, client_secret, redirect_uri].every((x) => typeof x === 'string')) {
    throw new TypeError('Invalid config')
  }

  const getAccessToken = async (code) => {
    if (!code) throw new Error('No code received')

    const res = await fetch(info.token_url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id,
        client_secret,
        redirect_uri,
      }),
    })
    const { access_token } = await res.json()
    return access_token
  }

  const getResource = async (resource, token) => {
    const url = new URL(resource)
    if (token) url.searchParams.set(info.token_name, token)
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
    return res.json()
  }

  // Construct the full auth url
  const url = new URL(info.auth_url)
  url.search = new URLSearchParams({
    ...info.params,
    response_type: 'code',
    client_id,
    redirect_uri,
  })
  const full_auth_url = `${url}`

  // Main login flow, accepts auth code and returns user profile
  const auth = async (authCode) => {
    const token = await getAccessToken(authCode)
    const profile = await getResource(info.profile_url, token)
    return info.parseProfile(profile)
  }

  return { auth, full_auth_url }
}
