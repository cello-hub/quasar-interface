import type { SocialPlatfromInOne } from './../../constants/social-platform'
import IBaseEntity from './base'

export interface ISocial extends IBaseEntity {
  account: string
  password: string
  platform: SocialPlatfromInOne
  available: boolean
  remark: string
}
