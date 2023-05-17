import {
  Box,
  HStack,
  Button,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  keyframes,
  usePrefersReducedMotion,
  IconButton,
  useColorModeValue,
  Text,
  useClipboard,
  useToast
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import {
  createWallet,
  getWallets,
  getPrivateKey,
  updateBalance
} from '../../api/wallet'
import UniTable from '../../components/table/UniTable'
import dayjs from 'dayjs'
import { MdAdd, MdCheck, MdClose, MdCopyAll, MdRefresh } from 'react-icons/md'
import useChainStore from '../../store/useChainStore'
import { ethers } from 'ethers'
import EditWallet from './Edit'

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

export default function Wallet() {
  const chains = useChainStore((state) => state.chains)
  const prefersReducedMotion = usePrefersReducedMotion()

  const animation = prefersReducedMotion
    ? undefined
    : `${spin} infinite .5s linear`

  const columnsData = [
    {
      Header: '别名',
      accessor: 'alias'
    },
    {
      Header: '地址',
      accessor: 'address'
    },
    {
      Header: 'EVM',
      accessor: 'is_evm'
    },
    {
      Header: '可用',
      id: 'available',
      Cell: ({ row }) => {
        if (row.original.available) {
          return <Icon as={MdCheck} color='green.500'></Icon>
        }
        return <Icon as={MdClose} color='red.600'></Icon>
      }
    },
    {
      Header: '余额(ETH)',
      id: 'balance',
      Cell: ({ row }) => {
        return (
          <HStack>
            <Box as='span'>{row.original.balance}</Box>
            <Icon
              as={MdRefresh}
              cursor='pointer'
              color='brand.500'
              animation={row.original.loading && animation}
              onClick={() => onRefreshBalance(row)}
            />
          </HStack>
        )
      }
    },
    {
      Header: '创建时间',
      accessor: 'created_at'
    },
    {
      Header: '编辑',
      id: 'edit',
      Cell: ({ row }) => {
        return (
          <HStack>
            <Button
              onClick={() => {
                onOpenPKModel()
                getPk(row.original.address)
              }}
              size={'sm'}
            >
              私钥
            </Button>
            <Button size={'sm'} onClick={() => onOpenEditModal(row.original)}>
              编辑
            </Button>
          </HStack>
        )
      }
    }
  ]

  const [tableData, setTableData] = useState([])
  useEffect(() => {
    getList()
  }, [])

  const getList = () => {
    getWallets().then((res) => {
      setTableData(
        res.map((item) => {
          item.loading = false
          item.created_at = dayjs(item.created_at).format('YYYY-MM-DD HH:mm:ss')
          item.updatee_at = dayjs(item.updatee_at).format('YYYY-MM-DD HH:mm:ss')
          return item
        })
      )
    })
  }

  const onCreate = async () => {
    await createWallet()
    getList()
  }

  const onRefreshBalance = async (row) => {
    if (!chains.get(1)) return

    const isLoading = !row.original.loading
    setTableData(
      tableData.map((item, index) => {
        if (index === row.index) {
          item.loading = isLoading
        }
        return item
      })
    )

    const chain = chains.get(1)
    const provider = new ethers.JsonRpcProvider(chain.rpc_url)

    const balance = await provider.getBalance(row.original.address)
    setTableData(
      tableData.map((item, index) => {
        if (index === row.index) {
          item.loading = false
          item.balance = parseFloat(ethers.formatEther(balance)).toFixed(4)
        }
        return item
      })
    )

    await updateBalance(row.original.address, String(balance))
  }

  const {
    isOpen: isOpenForm,
    onOpen: onOpenForm,
    onClose: onCloseForm
  } = useDisclosure()

  const {
    isOpen: isOpenPKModel,
    onOpen: onOpenPKModel,
    onClose: onClosePKModel
  } = useDisclosure()

  const [editWallet, setEditWallet] = useState({})
  const onOpenEditModal = (item) => {
    setEditWallet(item)
    onOpenForm()
  }

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

  const [pk, setPk] = useState('')
  const [hasPk, setHasPk] = useState(true)
  const { onCopy, setValue: setCopyText, hasCopied } = useClipboard('')
  const toast = useToast()

  const getPk = async (address) => {
    getPrivateKey(address)
      .then((res) => {
        setPk(res.pk)
        setHasPk(true)
        setCopyText(res.pk)
      })
      .catch((e) => {
        setHasPk(false)
      })
  }

  useEffect(() => {
    if (hasCopied) {
      toast({
        position: 'top',
        title: '复制成功',
        status: 'success',
        variant: 'left-accent',
        duration: '2000'
      })
    }
  }, [hasCopied])

  const onUpdateSucceed = () => {
    getList()
    onCloseForm()
  }

  return (
    <Box>
      <UniTable
        columns={columnsData}
        data={tableData}
        title='钱包列表'
        update
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
              onClick={onCreate}
            />
          </HStack>
        }
      ></UniTable>

      <EditWallet
        isOpenForm={isOpenForm}
        onCloseForm={onCloseForm}
        wallet={editWallet}
        onUpdateSucceed={onUpdateSucceed}
      />

      <Modal isOpen={isOpenPKModel} onClose={onClosePKModel}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>私钥</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {hasPk ? (
              <Box fontWeight='700'>
                <Text as='span'>{pk} </Text>
                <Icon as={MdCopyAll} cursor='pointer' onClick={onCopy}></Icon>
              </Box>
            ) : (
              <Text fontWeight='700'>无法查看该账号的私钥</Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
