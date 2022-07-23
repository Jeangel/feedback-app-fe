import React from 'react'
import { useForm } from 'react-hook-form'
import {
  VStack,
  Input,
  FormControl,
  FormLabel,
  Button,
  Box,
  Center,
  useToast,
  useBoolean,
  useId,
} from '@chakra-ui/react'
import AvatarPicker from '@components/forms/AvatarPicker'
import PasswordInput from '@components/forms/PasswordInput'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { YupSchemaKeys } from 'types/yup'
import FormControlError from '@components/forms/FormControlError'
import { ApiError } from '@utils/axios'
import { useRouter } from 'next/router'
import { useRegisterUser } from '@hooks/api/users/useRegisterUser'

interface IRegisterFormValues {
  avatarUrl: string
  fullName: string
  username: string
  password: string
}

const validationSchema = yup.object<YupSchemaKeys<IRegisterFormValues>>({
  avatarUrl: yup.string().label('Avatar').required().url(),
  fullName: yup.string().label('Full Name').required().min(3).max(100),
  username: yup.string().label('Username').required().min(5).max(20),
  password: yup.string().label('Password').required().min(5),
})

const RegisterForm = () => {
  const toast = useToast()
  const router = useRouter()
  const id = useId()
  const {
    register,
    handleSubmit: makeHandleOnSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<IRegisterFormValues>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    delayError: 500
  })
  const { mutate: registerUser, isLoading } = useRegisterUser()

  const handleOnSubmit = (values: IRegisterFormValues) => {
    registerUser(
      { user: values },
      {
        onSuccess: () => {
          toast({
            description: 'You have been registered successfully!',
            status: 'success',
          })
          router.push('/login')
        },
        onError: (error) => {
          const apiError = error as ApiError
          toast({ status: 'error', description: apiError.message })
        },
      }
    )
  }

  const handleOnAvatarChange = (avatarUrl: string) => {
    const { onChange } = register('avatarUrl')
    onChange({ target: { value: avatarUrl } })
    setValue('avatarUrl', avatarUrl)
  }

  return (
    <Box>
      <form onSubmit={makeHandleOnSubmit(handleOnSubmit)}>
        <Center>
          <AvatarPicker onChange={handleOnAvatarChange} />
        </Center>
        <VStack spacing={6} py='4'>
          <FormControl id={`${id}-fullName`} isInvalid={!!errors.fullName}>
            <FormLabel>Full Name</FormLabel>
            <Input {...register('fullName')} />
            <FormControlError error={errors.fullName} />
          </FormControl>
          <FormControl id={`${id}-username`} isInvalid={!!errors.username}>
            <FormLabel>Username</FormLabel>
            <Input {...register('username')} />
            <FormControlError error={errors.username} />
          </FormControl>
          <FormControl id={`${id}-password`} isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <PasswordInput {...register('password')} />
            <FormControlError error={errors.password} />
          </FormControl>
        </VStack>
        <Button
          mt='6'
          colorScheme='primary'
          width='full'
          type='submit'
          isLoading={isLoading}
          isDisabled={!isValid}
        >
          Register
        </Button>
      </form>
    </Box>
  )
}

export default RegisterForm
