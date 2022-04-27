import { Box, ComponentWithAs, BoxProps, As } from '@chakra-ui/react'
import { Icon, IconProps } from '@chakra-ui/icons'

interface IRoundedBadgeProps extends BoxProps {
  icon: As
}

const RoundedBadge = ({ icon, ...rest }: IRoundedBadgeProps) => (
  <Box
    boxSize='56px'
    {...rest}
    bg='primary-gradient.500'
    borderRadius='full'
    display='flex'
    alignItems='center'
    justifyContent='center'
  >
    <Icon as={icon} h='20px' w='20px' color='white' />
  </Box>
)

export default RoundedBadge
