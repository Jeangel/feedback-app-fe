import React from 'react'
import {
  VStack,
  Input,
  FormControl,
  FormLabel,
  Button,
  Box,
  useToast,
  useBoolean,
  useId,
} from '@chakra-ui/react'
import PasswordInput from '@components/forms/PasswordInput'
import * as yup from 'yup'
import { YupSchemaKeys } from 'types/yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FormControlError from '@components/forms/FormControlError'
import { ApiError } from '@utils/axios'
import { signIn } from 'next-auth/react'
import { SignInResponse } from 'next-auth/react'
import { useRouter } from 'next/router'

interface ILoginFormValues {
  username: string
  password: string
}

const validationSchema = yup.object<YupSchemaKeys<ILoginFormValues>>({
  username: yup.string().label('Username').required().min(5).max(20),
  password: yup.string().label('Password').required().min(5),
})

const LoginForm = () => {
  const {
    register,
    handleSubmit: makeHandleOnSubmit,
    formState: { errors, isValid },
  } = useForm<ILoginFormValues>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    delayError: 500
  })
  const router = useRouter()
  const id = useId()

  const [isLoading, { on: setIsLoading, off: setIsNotLoading }] = useBoolean(false)
  const toast = useToast()

  const handleOnSubmit = async (values: ILoginFormValues) => {
    setIsLoading()
    try {
      const response = await signIn('credentials', {
        username: values.username,
        password: values.password,
        redirect: false,
      })
      const signInResponse = response as unknown as SignInResponse
      if (signInResponse.error) {
        setIsNotLoading()
        toast({ status: 'error', description: signInResponse.error })
        return
      }
      router.push('/suggestions')
    } catch (error) {
      const apiError = error as ApiError
      toast({ status: 'error', description: apiError.message })
      setIsNotLoading()
    }
  }

  const handleOnUseDemoUser = () => {
    handleOnSubmit({ username: 'demoUser', password: 'demoPassword' })
  }

  return (
    <Box>
      <form onSubmit={makeHandleOnSubmit(handleOnSubmit)}>
        <VStack spacing={6} py='4'>
          <FormControl id={`${id}-username`} isInvalid={!!errors.username}>
            <FormLabel>Username</FormLabel>
            <Input {...register('username')} />
            <FormControlError error={errors.username} />
          </FormControl>
          <FormControl id={`${id}-password`} isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <PasswordInput {...register('password')} />
            <FormControlError error={errors.username} />
          </FormControl>
        </VStack>
        <Button
          mt='6'
          colorScheme='primary'
          type='submit'
          isLoading={isLoading}
          isDisabled={!isValid}
          width='full'
        >
          Login
        </Button>
        <Button
          mt='6'
          variant='link'
          textDecoration='underline'
          color='tertiary.500'
          width='full'
          type='button'
          onClick={handleOnUseDemoUser}
        >
          Use demo user
        </Button>
      </form>
    </Box>
  )
}

export default LoginForm
