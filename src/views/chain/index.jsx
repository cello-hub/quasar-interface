import { getChains } from '@/api/chain'
import UniTable from '@/components/table/UniTable'
import {
  Box,
  useDisclosure,
  IconButton,
  Icon,
  useColorModeValue,
  HStack,
  Text
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import ChainForm from './Form'
import { MdAdd, MdCheck, MdClose } from 'react-icons/md'
import LiveIcon from '../../components/liveIcon'

export default function Nodes() {
  const columnsDataComplex = [
    {
      Header: '公链名称',
      accessor: 'topic'
    },
    {
      Header: '节点名称',
      accessor: 'name'
    },
    {
      Header: 'Chain Id',
      accessor: 'chain_id'
    },
    {
      Header: '主网',
      id: 'is_mainnet',
      Cell: ({ row }) => {
        if (row.original.is_mainnet) {
          return <Icon as={MdCheck} color='green.500'></Icon>
        }
        return <Icon as={MdClose} color='red.600'></Icon>
      }
    },
    {
      Header: 'RPC',
      accessor: 'rpc_url'
    },
    {
      Header: '节点状态',
      id: 'status',
      Cell: ({ row }) => {
        return (
          <HStack>
            <LiveIcon />
            <Text fontWeight='normal' color='green.500'>
              10ms
            </Text>
          </HStack>
        )
      }
    }
  ]

  const [tableData, setTableData] = useState([])

  const getList = async () => {
    getChains().then((res) => {
      setTableData(res)
    })
  }
  useEffect(() => {
    getList()
  }, [])

  const { isOpen, onOpen, onClose } = useDisclosure()

  const bgButton = useColorModeValue('secondaryGray.300', 'whiteAlpha.100')
  const bgHover = useColorModeValue(
    { bg: 'secondaryGray.400' },
    { bg: 'whiteAlpha.50' }
  )
  const bgFocus = useColorModeValue(
    { bg: 'secondaryGray.300' },
    { bg: 'whiteAlpha.100' }
  )
  const iconColor = useColorModeValue('brand.500', 'white')
  return (
    <Box>
      <UniTable
        title='节点列表'
        menu={
          <HStack>
            <IconButton
              icon={
                <Icon as={MdAdd} color={iconColor} w='24px' h='24px'></Icon>
              }
              bg={bgButton}
              _hover={bgHover}
              _focus={bgFocus}
              _active={bgFocus}
              w='37px'
              h='37px'
              lineHeight='100%'
              borderRadius='10px'
              onClick={onOpen}
            />
          </HStack>
        }
        columns={columnsDataComplex}
        data={tableData}
      ></UniTable>

      <ChainForm
        isOpen={isOpen}
        onClose={onClose}
        onCreateSucceed={getList}
      ></ChainForm>
    </Box>
  )
}
