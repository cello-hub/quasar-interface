import { Table, TableProps } from 'antd'
import { PlusCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons'

interface IUniTableProps extends TableProps<any> {}

export default function UniTable(props: IUniTableProps) {
  if (props.expandable) {
    props.expandable.columnWidth = 50
    props.expandable.expandIcon = ({ expanded, onExpand, record }) => {
      if (expanded) {
        return <MinusCircleTwoTone onClick={(e) => onExpand(record, e)} />
      }
      return <PlusCircleTwoTone onClick={(e) => onExpand(record, e)} />
    }

    // if (props.expandable.expandedRowRender) {
    //   props.expandable.expandedRowRender = (record) => {
    //     return <div>{props.expandable!.expandedRowRender!(record)}</div>
    //   }
    // }
  }

  return (
    <Table
      pagination={{
        pageSize: 20,
        showQuickJumper: true,
        showTotal: (total) => `Total ${total} items`
      }}
      bordered
      {...props}
    />
  )
}
