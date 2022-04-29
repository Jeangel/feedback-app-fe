import { Box, Button } from '@chakra-ui/react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

const ProfileCard = () => {
  const router = useRouter()
  const handleOnLogout = async () => {
    await signOut()
    router.push('/login')
  }

  return (
    <Box h='178px' w='full' minW='223px' bg='white' borderRadius='10px' p='10px'>
      <Button onClick={handleOnLogout}>Logout</Button>
    </Box>
  )
}

export default ProfileCard
