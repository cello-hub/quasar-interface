import { getClusterList } from './../api/cluster/index'
import { create } from 'zustand'
import { ICluster } from '../types/entities/cluster'

interface IClusterState {
  clusterList: ICluster[]
  clusterOptions: { label: string; value: number }[]
  updatClusterList: () => void
}

const useClusterStore = create<IClusterState>()((set) => ({
  clusterList: [],
  clusterOptions: [],
  updatClusterList: async () => {
    const clusterList = await getClusterList()
    set({
      clusterList,
      clusterOptions: clusterList.map((cluster) => {
        return {
          label: cluster.name,
          value: cluster.id
        }
      })
    })
  }
}))

export default useClusterStore
