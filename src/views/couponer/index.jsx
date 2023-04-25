import { getChains } from '@/api/chain'
import UniTable from '@/components/table/UniTable'
import UniTableMenu from '@/components/table/UniTableMenu'
import { Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
// import CouponerForm from './Form'

export default function Couponer() {
  const columnsDataComplex = [
    {
      Header: '名称',
      accessor: 'name'
    },
    {
      Header: '链接',
      accessor: 'link'
    },
    {
      Header: '交互地址',
      accessor: 'accounts'
    },
    {
      Header: '交互时间',
      accessor: 'time'
    },
    {
      Header: '成本',
      accessor: 'cost'
    },
    {
      Header: '是否结束',
      accessor: 'finish'
    },
    {
      Header: '备注',
      accessor: 'remark'
    }
  ]

  const [tableData, setTableData] = useState([])

  useEffect(() => {
    getChains().then((res) => {
      console.log(res)
      setTableData(res)
    })
  }, [])

  const onCreate = () => {}

  return (
    <Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
      <UniTable
        title='节点列表'
        menu={<UniTableMenu onCreate={onCreate} />}
        columns={columnsDataComplex}
        data={tableData}
      ></UniTable>

      {/* <Modal isOpen={true} onClose={() => {}} isCentered>
        <div></div>
      </Modal> */}
    </Box>
  )
}
