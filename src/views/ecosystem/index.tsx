import { Button, Space, theme } from 'antd'
import UniTable from '../../components/UniTable'
import { PlusOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { IEcosystem } from '../../types/entities/ecosystem'
import EcosystemForm from './Form'
import { getEcosystems } from '../../api/ecosystem'
import { ColumnsType } from 'antd/es/table'
import { Link } from 'react-router-dom'
import { FaDiscord, FaTwitter } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'

export default function Ecosystem() {
  const { token } = theme.useToken()
  const [ecosystemList, setEcosystemList] = useState<IEcosystem[]>([])
  const [editableEcosystem, setEditableEcosystem] = useState<IEcosystem>()
  const [isOpenForm, setIsOpenForm] = useState(false)
  useEffect(() => {
    getList()
  }, [])

  const getList = async () => {
    getEcosystems().then((list) => {
      const ecosystemList = list.map((item) => {
        return item
      })
      setEcosystemList(ecosystemList)
    })
  }

  const columns: ColumnsType<IEcosystem> = [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center'
    },
    {
      title: 'NAME',
      dataIndex: 'name',
      align: 'center',
      render: (text, record) => {
        return (
          <Link to={record.link} target='_blank'>
            <Button type='link'>{text}</Button>
          </Link>
        )
      }
    },
    {
      title: 'CHAIN',
      dataIndex: 'chain',
      render: (chain) => {
        return <div>{chain.topic}</div>
      }
    },
    {
      title: 'SOCIAL',
      dataIndex: 'social',
      align: 'center',
      key: 'social',
      render: (_, record) => {
        return (
          <Space>
            {record.discord && (
              // <Button shape='circle' icon={<FaDiscord />}></Button>
              <Link to={record.discord} target='_blank'>
                <FaDiscord color={token.colorPrimary} />
              </Link>
            )}

            {record.twitter && (
              <Link to={record.twitter} target='_blank'>
                <FaTwitter color={token.colorPrimary} />
              </Link>
            )}
          </Space>
        )
      }
    },
    {
      title: 'DESC',
      dataIndex: 'desc'
    },
    {
      title: 'REMARK',
      dataIndex: 'remark'
    },
    {
      title: 'CREATE_DATE',
      dataIndex: 'created_at'
    },
    {
      title: 'UPDATE_DATE',
      dataIndex: 'updated_at'
    },
    {
      title: 'OPERATION',
      key: 'operation',
      align: 'center',
      render: (_, record) => {
        return (
          <Space wrap>
            <Button
              size='small'
              type='link'
              icon={<MdEdit />}
              onClick={() => onUpdate(record)}
            />
          </Space>
        )
      }
    }
  ]

  const onUpdate = (record: IEcosystem) => {
    setIsOpenForm(true)
    setEditableEcosystem(record)
  }
  return (
    <div>
      <Button
        icon={<PlusOutlined />}
        type='primary'
        style={{ marginBottom: '10px' }}
        onClick={() => {
          setIsOpenForm(true)
          setEditableEcosystem(undefined)
        }}
      />
      <UniTable columns={columns} dataSource={ecosystemList} rowKey={'id'} />

      <EcosystemForm
        open={isOpenForm}
        onCloseFormModal={() => setIsOpenForm(false)}
        onSubmitSucceed={() => {
          setIsOpenForm(false)
          getList()
        }}
        ecosystem={editableEcosystem}
      />
    </div>
  )
}
