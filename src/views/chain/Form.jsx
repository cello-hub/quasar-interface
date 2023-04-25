import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormLabel,
  ModalCloseButton,
  Button,
  Input,
  Box,
  RadioGroup,
  Stack,
  Radio
} from '@chakra-ui/react'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { createChain } from '../../api/chain'
export default function ChainForm(props) {
  const { isOpen, onClose, item } = props

  const { handleSubmit, register, control } = useForm()
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (values) => {
    console.log(values)
    if (submitting) return

    if (Number(values.is_mainnet) === 1) values.is_mainnet = true
    else values.is_mainnet = false

    setSubmitting(true)

    console.log(values)
    await createChain(values)
    setSubmitting(false)
    onClose()

    props.onCreateSucceed && props.onCreateSucceed()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>{item ? '编辑' : '新增'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <FormLabel fontSize={{ sm: '14px' }}>公链名称</FormLabel>
              <Input {...register('topic')}></Input>
            </Box>
            <Box mt='15px'>
              <FormLabel fontSize={{ sm: '14px' }}>节点名称</FormLabel>
              <Input {...register('name')}></Input>
            </Box>
            <Box mt='15px'>
              <FormLabel fontSize={{ sm: '14px' }}>ChainId</FormLabel>
              <Input {...register('chain_id')}></Input>
            </Box>
            <Box mt='15px'>
              <FormLabel fontSize={{ sm: '14px' }}>是否主网</FormLabel>
              <Controller
                control={control}
                name='is_mainnet'
                defaultValue='1'
                render={({ field: { onChange, value } }) => {
                  return (
                    <RadioGroup
                      onChange={onChange}
                      value={value}
                      defaultValue='1'
                    >
                      <Stack direction='row'>
                        <Radio value='1'>是</Radio>
                        <Radio value='0'>否</Radio>
                      </Stack>
                    </RadioGroup>
                  )
                }}
              />
            </Box>

            <Box mt='15px'>
              <FormLabel fontSize={{ sm: '14px' }}>RPC地址</FormLabel>
              <Input {...register('rpc_url')}></Input>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              关闭
            </Button>
            <Button isLoading={submitting} loadingText='确认中' type='submit'>
              确定
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
