export const SocialPlatfrom = [
  'Google',
  'Twitter',
  'Facebook',
  'Discord',
  'Telegram',
  'Okx',
  'Binance',
  'Bybit',
  'Mexc',
  'Gate',
  'Twitch',
  'Aws Builder',
  'Aws Cloud',
  'AdsPower'
] as const

export type SocialPlatfromInOne = (typeof SocialPlatfrom)[number]

export const SocialPlatfromOptions = SocialPlatfrom.map((platform) => {
  return {
    label: platform,
    value: platform
  }
})
