import { Table, TableProps } from 'antd'

interface IUniTableProps extends TableProps<any> {}

export default function UniTable(props: IUniTableProps) {
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
