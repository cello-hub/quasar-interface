import { Select, SelectProps } from 'antd'
import { IEcosystem } from '../../types/entities/ecosystem'
import { useEffect, useState } from 'react'
import { getEcosystems } from '../../api/ecosystem'

interface IEcosystemSelectProps extends SelectProps {
  ecosystemList?: IEcosystem[]
}

export default function EcosystemSelect(props: IEcosystemSelectProps) {
  const [ecosystemList, setEcosystemList] = useState<IEcosystem[]>(
    props.ecosystemList ?? []
  )

  useEffect(() => {
    if (props.ecosystemList && props.ecosystemList.length > 0) {
      setEcosystemList(props.ecosystemList)
    }
  }, [props.ecosystemList])

  const onSearch = (value: string) => {
    if (!value) {
      return setEcosystemList([])
    }
    getEcosystems({
      name: value
    }).then((list) => {
      setEcosystemList(list)
    })
  }
  return (
    <Select
      showSearch
      allowClear
      filterOption={false}
      showArrow={false}
      {...props}
      onSearch={onSearch}
      options={(ecosystemList || []).map((ecosystem) => ({
        label: ecosystem.name,
        value: ecosystem.id
      }))}
    />
  )
}
