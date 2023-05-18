import { Table, TableProps } from 'antd'

interface IUniTableProps extends TableProps<any> {}

export default function UniTable(props: IUniTableProps) {
  return <Table bordered {...props} />
}
