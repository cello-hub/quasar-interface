export const TokenType = ['COIN', 'NFT'] as const

export type TokenTypeInOne = (typeof TokenType)[number]

export const TokenTypeOptions = TokenType.map((platform) => {
  return {
    label: platform,
    value: platform
  }
})
