import { ICluster } from '../../types/entities/cluster'

type IClusterKeys = keyof ICluster

export default function ClusterExpandRow(props: ICluster) {
  return (
    <div>
      {Object.keys(props).map((key) => {
        return (
          <div
            style={{
              display: 'flex'
            }}
          >
            <span>{key + ': '}</span>
            <span>{props[key as IClusterKeys]}</span>
          </div>
        )
      })}
    </div>
  )
}
