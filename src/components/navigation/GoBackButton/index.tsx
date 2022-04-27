import { Button, Icon } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { HiChevronLeft } from 'react-icons/hi'

const GoBackButton = () => {
  const router = useRouter()
  const handleOnClick = () => {
    router.back()
  }
  return (
    <Button
      variant='link'
      color='tertiary.200'
      leftIcon={<Icon as={HiChevronLeft} color='secondary.500' />}
      fontWeight='bold'
      _hover={{ textDecoration: 'none' }}
      onClick={handleOnClick}
    >
      Go Back
    </Button>
  )
}

export default GoBackButton
