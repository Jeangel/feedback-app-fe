import { VStack, Input, FormControl, FormLabel, Button, Box } from '@chakra-ui/react'
import React from 'react'

const LoginForm = () => {
  return (
    <Box>
      <VStack spacing={6} py='4'>
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
        Login
      </Button>
      <Button
        mt='6'
        variant='link'
        textDecoration='underline'
        color='tertiary.500'
        isFullWidth
      >
        Use demo user
      </Button>
    </Box>
  )
}

export default LoginForm
