import UniTable from '@/components/table/UniTable'
import {
  Box,
  useDisclosure,
  Icon,
  Button,
  VStack,
  Link
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import { getSheepEvents } from '../../api/sheep-event'
import CreateButton from '../../components/create/button'
import SheepEventForm from './form'
// import CouponerForm from './Form'

export default function SheepEvent() {
  const columnsDataComplex = [
    {
      Header: '名称',
      accessor: 'name'
    },
    {
      Header: '描述',
      accessor: 'desc'
    },
    {
      Header: '链接',
      accessor: 'link',
      Cell: ({ row }) => {
        const links = row.original.link || ''
        const linkArray = links.split('\n')

        return (
          <VStack alignItems='flex-start'>
            {linkArray.map((link) => {
              return (
                <Box key={link}>
                  <Link href={link} target='_blank' color='green.500'>
                    {link}
                  </Link>
                </Box>
              )
            })}
          </VStack>
        )
      }
    },
    {
      Header: '是否结束',
      accessor: 'finished',
      Cell: ({ row }) => {
        if (row.original.finished) {
          return (
            <Icon
              as={MdCheckBox}
              color='green.500'
              width='20px'
              height='20px'
            />
          )
        }
        return (
          <Icon
            as={MdCheckBoxOutlineBlank}
            color='green.500'
            width='20px'
            height='20px'
          />
        )
      }
    },
    {
      Header: '备注',
      accessor: 'remark'
    },
    {
      Header: '编辑',
      Cell: ({ row }) => {
        return (
          <Button
            variant='outline'
            size='sm'
            onClick={() => {
              setCurrent(row.original)
              onOpenForm()
            }}
          >
            编辑
          </Button>
        )
      }
    }
  ]

  const [tableData, setTableData] = useState([])

  useEffect(() => {
    getList()
  }, [])

  const getList = () => {
    getSheepEvents().then((res) => {
      setTableData(res)
    })
  }

  const onCreateSucceed = () => {
    getList()
  }
  const [current, setCurrent] = useState()
  const {
    isOpen: isOpenForm,
    onOpen: onOpenForm,
    onClose: onCloseForm
  } = useDisclosure()

  return (
    <Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
      <UniTable
        title='参与事件'
        menu={
          <CreateButton
            onClick={() => {
              setCurrent(null)
              onOpenForm()
            }}
          />
        }
        columns={columnsDataComplex}
        data={tableData}
      ></UniTable>

      <SheepEventForm
        isOpen={isOpenForm}
        onClose={onCloseForm}
        item={current}
        onCreateSucceed={onCreateSucceed}
      />

      {/* <Modal isOpen={true} onClose={() => {}} isCentered>
        <div></div>
      </Modal> */}
    </Box>
  )
}
