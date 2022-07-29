import { Button, ChakraProps, Icon } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { HiChevronLeft } from 'react-icons/hi'

interface IGoBackButtonProps extends ChakraProps {
  iconProps?: ChakraProps
}

const GoBackButton = ({ iconProps, ...buttonProps }: IGoBackButtonProps) => {
  const router = useRouter()
  const handleOnClick = () => {
    router.back()
  }
  return (
    <Button
      variant='link'
      color='tertiary.200'
      leftIcon={<Icon color='secondary.500' {...iconProps} as={HiChevronLeft} />}
      {...buttonProps}
      fontWeight='bold'
      onClick={handleOnClick}
    >
      Go Back
    </Button>
  )
}

export default GoBackButton
