import { create } from 'zustand'
import { IChain } from '../types/entities/chain'
import { getChainList } from '../api/chain'

interface IChainState {
  chainList: IChain[]
  chainOptions: { label: string; value: string }[]
  updateChainList: () => void
}

const useChainStore = create<IChainState>()((set) => ({
  chainList: [],
  chainOptions: [],
  updateChainList: async () => {
    const chainList = await getChainList()
    set({
      chainList,
      chainOptions: chainList.map((chain) => {
        return {
          label: chain.topic,
          value: String(chain.id)
        }
      })
    })
  }
}))

export default useChainStore
