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
  Radio,
  Textarea,
  HStack,
  Text
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { createEcosystem, updateEcosystem } from '../../api/ecosystem'

export default function EventForm(props) {
  const { isOpen, onClose, item } = props

  const { handleSubmit, register, control, reset } = useForm()
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (props.item) {
      reset({
        ...item,
        finished: item.finished ? '1' : '0',
        link: item.link
      })
    } else {
      reset({})
    }
  }, [props.item])

  const onSubmit = async (values) => {
    console.log(values)
    if (submitting) return
    values.finished = Number(values.finished)
    values.link = values.link
      .split('\n')
      .filter((item) => {
        return item.trim() !== ''
      })
      .join('\n')
    setSubmitting(true)

    if (item && item.id) {
      await updateEcosystem({
        id: item.id,
        name: values.account,
        desc: values.platform,
        link: values.link,
        finished: values.finished,
        remark: values.remark
      })
    } else {
      await createEcosystem(values)
    }

    setSubmitting(false)
    onClose()

    props.onCreateSucceed && props.onCreateSucceed()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>{item ? '编辑' : '新增'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <FormLabel fontSize={{ sm: '14px' }}>名称</FormLabel>
              <Input {...register('name')}></Input>
            </Box>
            <Box mt='15px'>
              <FormLabel fontSize={{ sm: '14px' }}>描述</FormLabel>
              <Textarea {...register('desc')} />
            </Box>
            <Box mt='15px'>
              <FormLabel fontSize={{ sm: '14px' }}>
                <HStack>
                  <Text as='span'>链接</Text>
                  <Text as='span' fontSize='10px' color='red'>
                    (多个链接直接换行)
                  </Text>
                </HStack>
              </FormLabel>
              <Textarea {...register('link')} />
            </Box>

            <Box mt='15px'>
              <FormLabel fontSize={{ sm: '14px' }}>是否结束</FormLabel>
              <Controller
                control={control}
                name='finished'
                defaultValue='0'
                render={({ field: { onChange, value } }) => {
                  return (
                    <RadioGroup
                      onChange={onChange}
                      value={value}
                      defaultValue='0'
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
              <FormLabel fontSize={{ sm: '14px' }}>备注</FormLabel>
              <Textarea {...register('remark')} />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button isLoading={submitting} loadingText='确认中' type='submit'>
              确定
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
