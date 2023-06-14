import { Select, SelectProps } from 'antd'
import { IEcosystem } from '../../types/entities/ecosystem'
import { useState } from 'react'
import { getEcosystems } from '../../api/ecosystem'

export default function EcosystemSelect(props: SelectProps) {
  const [data, setData] = useState<IEcosystem[]>([])

  const onSearch = (value: string) => {
    if (!value) {
      return setData([])
    }
    getEcosystems({
      name: value
    }).then((list) => {
      setData(list)
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
      options={(data || []).map((item) => ({
        label: item.name,
        value: item.id
      }))}
    ></Select>
  )
}
