import { Box, ComponentWithAs, BoxProps } from '@chakra-ui/react'
import { Icon, IconProps } from '@chakra-ui/icons'

interface IRoundedBadgeProps extends BoxProps {
  icon: ComponentWithAs<'svg', IconProps>
}

const RoundedBadge = ({ icon, ...rest }: IRoundedBadgeProps) => (
  <Box
    {...rest}
    bg='primary-gradient.500'
    boxSize='56px'
    borderRadius='full'
    display='flex'
    alignItems='center'
    justifyContent='center'
  >
    <Icon as={icon} h='20px' w='20px' color='white' />
  </Box>
)

export default RoundedBadge
