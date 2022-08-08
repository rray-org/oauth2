export default {
  google: {
    auth_url: 'https://accounts.google.com/o/oauth2/v2/auth',
    token_url: 'https://oauth2.googleapis.com/token',
    token_name: 'access_token',
    profile_url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    params: {
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ].join(' '),
    },
    parseProfile: (info) => ({
      email: info.email,
      emails: [info.email],
      name: info.name,
      given_name: info.given_name,
      family_name: info.family_name,
      picture: info.picture,
      sex: null,
      birthday: null,
    }),
  },
  yandex: {
    auth_url: 'https://oauth.yandex.ru/authorize',
    token_url: 'https://oauth.yandex.ru/token',
    token_name: 'oauth_token',
    profile_url: 'https://login.yandex.ru/info',
    params: {},
    parseProfile: (info) => ({
      email: info.default_email,
      emails: info.emails,
      name: info.real_name || info.display_name,
      given_name: info.first_name,
      family_name: info.last_name,
      picture: info.is_avatar_empty
        ? null
        : `https://avatars.yandex.net/get-yapic/${info.default_avatar_id}/islands-retina-50`, // perhaps we want another size?
      sex: info.sex,
      birthday: info.birthday,
    }),
  },
}
