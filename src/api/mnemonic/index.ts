import { Mnemonic } from '../../types/entities/mnemonic'
import Http from '../http'

export const getMnemonicList = (): Promise<Mnemonic[]> => {
  return Http.get({
    url: 'mnemonic'
  })
}
