export const SocialPlatfrom = [
  'Google',
  'Twitter',
  'Facebook',
  'Discord',
  'Telegram'
] as const

export type SocialPlatfromInOne = (typeof SocialPlatfrom)[number]

export const SocialPlatfromOptions = SocialPlatfrom.map((platform) => {
  return {
    label: platform,
    value: platform
  }
})
