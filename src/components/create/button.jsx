import { HStack, IconButton, Icon, useColorModeValue } from '@chakra-ui/react'
import { MdAdd } from 'react-icons/md'

export default function CreateButton(props) {
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
    <HStack>
      <IconButton
        icon={<Icon as={MdAdd} color={iconColor} w='24px' h='24px'></Icon>}
        bg={bgButton}
        _hover={bgHover}
        _focus={bgFocus}
        _active={bgFocus}
        w='37px'
        h='37px'
        lineHeight='100%'
        borderRadius='10px'
        onClick={props.onClick}
      />
    </HStack>
  )
}
