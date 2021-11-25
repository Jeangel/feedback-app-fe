import { VStack, Input, FormControl, FormLabel, Button, Box, Center } from '@chakra-ui/react'
import AvatarPicker from '@components/AvatarPicker'
import React from 'react'

const RegisterForm = () => {
  return (
    <Box>
      <Center>
        <AvatarPicker />
      </Center>
      <VStack spacing={6} py='4'>
        <FormControl id='fullName'>
          <FormLabel>Full Name</FormLabel>
          <Input />
        </FormControl>
        <FormControl id='username'>
          <FormLabel>Username</FormLabel>
          <Input />
        </FormControl>
        <FormControl id='password'>
          <FormLabel>Password</FormLabel>
          <Input type='password' />
        </FormControl>
      </VStack>
      <Button mt='6' colorScheme='primary' isFullWidth>
        Register
      </Button>
    </Box>
  )
}

export default RegisterForm
