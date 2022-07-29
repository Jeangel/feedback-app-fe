import { Flex, IconButton, Heading, Text, Icon, HStack } from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FiLogOut } from 'react-icons/fi'
import { BsGear } from 'react-icons/bs'

const ProfileCard = () => {
  const router = useRouter()
  const { data: sessionData } = useSession()
  const handleOnLogout = async () => {
    await signOut()
    router.push('/login')
  }
  return (
    <Flex
      h='178px'
      w='full'
      minW='223px'
      bg='primary-gradient.500'
      borderRadius='10px'
      p='24px'
      direction='column'
      justifyContent='space-between'
    >
      <Flex direction='column' justifyContent='flex-end'>
        <Heading variant='h2' color='white'>
          {sessionData?.user.fullName}
        </Heading>
        <Text variant='body2' color='white'>
          @{sessionData?.user.username}
        </Text>
      </Flex>
      <HStack spacing='10px' justifyContent='flex-end'>
        <IconButton
          size='xs'
          variant='unstyled'
          aria-label='Settings'
          icon={<Icon as={BsGear} color='white' fontSize='16px' />}
          alignSelf='flex-end'
          pb='0'
        />
        <IconButton
          size='xs'
          variant='unstyled'
          aria-label='Logout'
          icon={<Icon as={FiLogOut} color='white' fontSize='16px' />}
          alignSelf='flex-end'
          pb='0'
          onClick={handleOnLogout}
        />
      </HStack>
    </Flex>
  )
}

export default ProfileCard
