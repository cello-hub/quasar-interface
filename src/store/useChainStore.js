import { create } from 'zustand'
import { getChains } from '../api/chain'

const useChainStore = create((set) => ({
  chains: new Map(),

  addChains: async (chain) => {
    const chains = await getChains()
    const chainsMap = new Map()

    chains.forEach((chain) => {
      chainsMap.set(chain.chain_id, chain)
    })

    set({ chains: chainsMap })
  }
}))

export default useChainStore
