import { IMnemonic } from '../../types/entities/mnemonic'
import Http from '../http'
import { ICreateMnemonicParams } from './types'

export const getMnemonicList = (): Promise<IMnemonic[]> => {
  return Http.get({
    url: 'mnemonic'
  })
}

export const createMnemonic = (
  data: ICreateMnemonicParams
): Promise<IMnemonic> => {
  return Http.post({
    url: 'mnemonic',
    data
  })
}

export const deleteMnemonic = (id: number) => {
  return Http.delete({
    url: `mnemonic/${id}`
  })
}

export const createWallet = (mnemonicId: number) => {
  return Http.post({
    url: `mnemonic/create_wallet`,
    data: {
      mnemonicId
    }
  })
}
