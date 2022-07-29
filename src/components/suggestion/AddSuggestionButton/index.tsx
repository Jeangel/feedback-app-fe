import { Button, ChakraProps, Icon } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { HiPlusSm } from 'react-icons/hi'

const AddSuggestionButton = (props: ChakraProps) => {
  const router = useRouter()
  return (
    <Button
      minW={{ sm: '130px', base: '145px' }}
      {...props}
      colorScheme='primary'
      leftIcon={<Icon as={HiPlusSm} />}
      onClick={() => router.push('/suggestions/new')}
    >
      Add Suggestion
    </Button>
  )
}

export default AddSuggestionButton
