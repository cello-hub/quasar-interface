import { ICluster } from '../../types/entities/cluster'

type IClusterKeys = keyof ICluster

export default function ClusterExpandRow(props: ICluster) {
  return (
    <div>
      {Object.keys(props).map((key, index) => {
        if (
          props[key as IClusterKeys] &&
          key !== 'created_at' &&
          key !== 'updated_at'
        ) {
          return (
            <div className='flex' key={index}>
              <span>{`${key}:`}&nbsp;</span>
              <span>{props[key as IClusterKeys]}</span>
            </div>
          )
        }
        return null
      })}
    </div>
  )
}
