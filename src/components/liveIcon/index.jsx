import { keyframes, usePrefersReducedMotion, Box } from '@chakra-ui/react'

const ripple = keyframes`
  0% { transform: scale(0.1, 0.1); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: scale(1.2, 1.2); opacity: 0;}
`

export default function LiveIcon() {
  const prefersReducedMotion = usePrefersReducedMotion()

  const animation = prefersReducedMotion
    ? undefined
    : `1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite normal none running ${ripple}`
  return (
    <Box pos='relative'>
      <Box
        top='-4px'
        left='-4px'
        w='16px'
        h='16px'
        border='2px solid'
        borderColor='green.500'
        opacity='0'
        pos='absolute'
        borderRadius='50%'
        animation={animation}
      ></Box>
      <Box w='8px' h='8px' bg='green.500' borderRadius='50%'></Box>
    </Box>
  )
}
