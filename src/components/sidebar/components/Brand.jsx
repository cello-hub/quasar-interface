import React from 'react'

// Chakra imports
import { Flex, useColorModeValue, Text, HStack } from '@chakra-ui/react'

import { HSeparator } from '@/components/separator/Separator'

export function SidebarBrand() {
  //   Chakra color mode
  const color = useColorModeValue('navy.700', 'white')

  return (
    <Flex align='center' direction='column'>
      {/* <HorizonLogo h='26px' w='175px' my='32px' color={logoColor} /> */}
      <HStack spacing='10px' mb='20px'>
        <Text fontSize={26} fontWeight={700} color={color}>
          {/* Gaming the{' '} */}
        </Text>
        <Text
          fontSize={26}
          fontWeight={700}
          color='transparent'
          background='linear-gradient(to right, #d16ba5, #ef7386, #f68866, #e9a650, #cac452, #9bcf6b, #66d591, #00d8bb, #00c7e1, #00b1ff, #0091ff, #6c5ffb)'
          style={{
            WebkitBackgroundClip: 'text'
          }}
        >
          amagi
        </Text>
      </HStack>
      <HSeparator mb='20px' />
    </Flex>
  )
}

export default SidebarBrand
