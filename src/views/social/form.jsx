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
  Select,
  HStack,
  Textarea,
  InputGroup,
  InputRightElement,
  IconButton
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { createSocialAccount, updateSocialAccount } from '../../api/social'
import { generateRandomPassword } from '../../tools'

export default function SocialForm(props) {
  const { isOpen, onClose, item } = props

  const { handleSubmit, register, control, setValue, reset } = useForm()
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (item) {
      reset({
        ...item,
        available: item.available ? '1' : '0'
      })
    } else {
      reset({})
    }
  }, [item])

  const onSubmit = async (values) => {
    if (submitting) return
    values.available = Number(values.available)
    setSubmitting(true)

    try {
      if (item && item.id) {
        await updateSocialAccount({
          id: item.id,
          account: values.account,
          platform: values.platform,
          available: values.available,
          remark: values.remark
        })
      } else {
        await createSocialAccount(values)
      }
      setSubmitting(false)
      onClose()
    } catch (error) {
      setSubmitting(false)
    }

    props.onCreateSucceed && props.onCreateSucceed()
  }

  const [showPassword, setShowPassword] = useState(false)

  const generatePassword = () => {
    setValue('password', generateRandomPassword(16))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
          <ModalHeader>{item ? '编辑' : '新增'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <FormLabel fontSize={{ sm: '14px' }}>账号</FormLabel>
              <Input {...register('account')}></Input>
            </Box>
            {!item && (
              <Box mt='15px'>
                <FormLabel fontSize={{ sm: '14px' }}>
                  <HStack display='inline-flex'>
                    <span>密码</span>
                    <Button
                      as='div'
                      cursor='pointer'
                      ml='40px'
                      size='sm'
                      variant='ghost'
                      color='brand.400'
                      onClick={generatePassword}
                    >
                      随机密码
                    </Button>
                  </HStack>
                </FormLabel>
                <InputGroup>
                  <Input
                    isDisabled={!!item}
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                  ></Input>
                  <InputRightElement>
                    <IconButton
                      icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      variant='unstyled'
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </InputRightElement>
                </InputGroup>
              </Box>
            )}

            <Box mt='15px'>
              <FormLabel fontSize={{ sm: '14px' }}>平台</FormLabel>
              {/* <Input {...register('chain_id')}></Input> */}
              <Select {...register('platform')}>
                <option value='Google'>Google</option>
                <option value='Twitter'>Twitter</option>
                <option value='Facebook'>Facebook</option>
                <option value='Telegram'>Telegram</option>
                <option value='Discord'>Discord</option>
              </Select>
            </Box>
            <Box mt='15px'>
              <FormLabel fontSize={{ sm: '14px' }}>是否可用</FormLabel>
              <Controller
                control={control}
                name='available'
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
