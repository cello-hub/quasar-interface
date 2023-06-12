import type { CollapseProps } from 'antd'
import { Button, Collapse } from 'antd'
import React, { useEffect, useState } from 'react'
import { ICluster } from '../../types/entities/cluster'
import { getClusterList } from '../../api/cluster'
import ClusterExpandRow from './ExpandRow'
import ClusterForm from './Form'
import EditIcon from '../../components/Icon/EditIcon'
import CreateIcon from '../../components/Icon/CreateIcon'

export default function Cluster() {
  const [clusterList, setClusterList] = useState<ICluster[]>([])
  const [collapseItems, setCollapseItems] = useState<CollapseProps['items']>([])
  const onChange = (key: string | string[]) => {
    console.log(key)
  }
  const getList = async () => {
    setClusterList(await getClusterList())
  }

  useEffect(() => {
    getList()
  }, [])

  useEffect(() => {
    const collapseItems: CollapseProps['items'] = clusterList.map((cluster) => {
      console.log(cluster)

      return {
        key: cluster.id,
        label: cluster.name,
        children: <ClusterExpandRow {...cluster} />,
        extra: (
          <Button
            size='small'
            type='link'
            icon={<EditIcon />}
            onClick={(event) => {
              event.stopPropagation()
              onUpdate(cluster)
            }}
          />
        )
      }
    })
    setCollapseItems(collapseItems)
  }, [clusterList])

  const [isOpenForm, setIsOpenForm] = useState(false)
  const [currentCluster, setCurrentCluster] = useState<ICluster>()
  const onCreate = () => {
    setIsOpenForm(true)
    setCurrentCluster(undefined)
  }

  const onUpdate = (record: ICluster) => {
    setIsOpenForm(true)
    setCurrentCluster(record)
  }

  return (
    <div>
      <Button
        icon={<CreateIcon />}
        type='primary'
        style={{ marginBottom: '10px' }}
        onClick={onCreate}
      />
      <Collapse items={collapseItems} />

      <ClusterForm
        open={isOpenForm}
        cluster={currentCluster}
        onCloseFormModal={() => {
          setIsOpenForm(false)
        }}
        onSubmitSucceed={() => {
          setIsOpenForm(false)
          getList()
        }}
      />
    </div>
  )
}
