import { Table } from 'antd'
import type { TableProps } from 'antd/es/table'

interface IUniTableProps<T> extends TableProps<T> {}

export default function UniTable<T>(props: IUniTableProps<T>) {
  return <Table {...props} bordered />
}
