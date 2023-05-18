import { create } from 'zustand'
import { IChain } from '../types/entities/chain'
import { getChainList } from '../api/chain'

interface IChainState {
  chainList: IChain[]
  updateChainList: () => void
}

const useChainStore = create<IChainState>()((set) => ({
  chainList: [],
  updateChainList: async () => {
    const chainList = await getChainList()
    set({ chainList })
  }
}))

export default useChainStore
