import { Box, useDisclosure, Button, Icon, HStack } from '@chakra-ui/react'
import UniTable from '../../components/table/UniTable'
import CreateButton from '../../components/create/button'
import SocialForm from './form'
import { useEffect, useState } from 'react'
import { getPassword, getSocials } from '../../api/social'
import { MdCheck, MdClose } from 'react-icons/md'
import dayjs from 'dayjs'
import { ViewIcon } from '@chakra-ui/icons'

export default function Social() {
  const columns = [
    {
      Header: '账号',
      accessor: 'account'
    },
    {
      Header: '密码',
      accessor: 'password',
      width: '20%',
      Cell: ({ row }) => {
        return (
          <HStack onClick={() => showHidePassword(row)} cursor='pointer'>
            <Box display='flex' alignItems='center'>
              {row.original.showPassword ? row.original.password : '******'}
            </Box>
            <ViewIcon />
          </HStack>
        )
      }
    },
    {
      Header: '平台',
      accessor: 'platform'
    },
    {
      Header: '可用',
      accessor: 'available',
      Cell: ({ row }) => {
        if (row.original.available) {
          return <Icon as={MdCheck} color='green.500'></Icon>
        }
        return <Icon as={MdClose} color='red.600'></Icon>
      }
    },
    {
      Header: '备注',
      accessor: 'remark'
    },
    {
      Header: '更新时间',
      accessor: 'updated_at',
      Cell: ({ row }) => {
        return (
          <Box>
            {dayjs(row.original.updated_at).format('YYYY-MM-DD HH:mm:ss')}
          </Box>
        )
      }
    },
    {
      Header: '',
      accessor: 'edit',
      Cell: ({ row }) => {
        return (
          <Button
            variant='outline'
            size='sm'
            onClick={() => {
              setCurrentSocial(row.original)
              onOpenForm()
            }}
          >
            编辑
          </Button>
        )
      }
    }
  ]

  const {
    isOpen: isOpenForm,
    onOpen: onOpenForm,
    onClose: onCloseForm
  } = useDisclosure()

  const [data, setData] = useState([])
  useEffect(() => {
    getList()
  }, [])

  const getList = async () => {
    const list = await getSocials()
    setData(list)
  }
  const onCreateSucceed = () => {
    getList()
  }

  const [currentSocial, setCurrentSocial] = useState(null)

  const showHidePassword = async (row) => {
    const { password } = await getPassword(row.original.id)
    setData(
      data.map((item, index) => {
        if (index === row.index) {
          item.password = password
          item.showPassword = !item.showPassword
        }
        return item
      })
    )
  }

  return (
    <Box>
      <UniTable
        title='社交账号'
        menu={
          <CreateButton
            onClick={() => {
              setCurrentSocial(null)
              onOpenForm()
            }}
          />
        }
        columns={columns}
        data={data}
      />

      <SocialForm
        isOpen={isOpenForm}
        onClose={onCloseForm}
        item={currentSocial}
        onCreateSucceed={onCreateSucceed}
      />
    </Box>
  )
}
