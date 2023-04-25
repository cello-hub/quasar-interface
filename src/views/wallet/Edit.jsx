import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Text,
  Box,
  FormLabel,
  Input,
  Stack,
  RadioGroup,
  Radio
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { updateWallet } from '../../api/wallet'

export default function EditWallet(props) {
  const { isOpenForm, onCloseForm, wallet, onUpdateSucceed } = props
  const { handleSubmit, register, control, reset } = useForm({
    defaultValues: wallet
  })

  useEffect(() => {
    if (wallet) {
      reset({
        ...wallet,
        available: wallet.available ? '1' : '0'
      })
    }
  }, [wallet])

  const onUpdateSubmit = (values) => {
    const formBody = {
      id: wallet.id,
      alias: values.alias,
      available: values.available === '1'
    }

    updateWallet(formBody).then((res) => {
      onUpdateSucceed && onUpdateSucceed()
    })
  }

  return (
    <Modal
      isOpen={isOpenForm}
      onClose={onCloseForm}
      closeOnOverlayClick={false}
    >
      <ModalOverlay backdropFilter='blur(5px) hue-rotate(90deg)' />
      <form onSubmit={handleSubmit(onUpdateSubmit)}>
        <ModalContent>
          <ModalHeader>编辑</ModalHeader>
          <ModalCloseButton />
          <ModalBody fontSize={{ sm: '14px' }}>
            <Text fontWeight='700'>地址 {wallet.address}</Text>

            <Box mt='15px'>
              <FormLabel fontSize={{ sm: '14px' }}>别名</FormLabel>
              <Input {...register('alias')} fontSize={{ sm: '14px' }}></Input>
            </Box>

            <Box mt='15px'>
              <FormLabel fontSize={{ sm: '14px' }}>是否可用</FormLabel>
              <Controller
                control={control}
                name='available'
                render={({ field: { onChange, value } }) => {
                  return (
                    <RadioGroup onChange={onChange} value={value}>
                      <Stack direction='row'>
                        <Radio value='1'>是</Radio>
                        <Radio value='0'>否</Radio>
                      </Stack>
                    </RadioGroup>
                  )
                }}
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onCloseForm}>
              关闭
            </Button>
            <Button type='submit'>确定</Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  )
}
