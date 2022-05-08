import User from '@app-types/User'
import { post } from '@utils/axios'
import { useMutation } from 'react-query'

interface IRegisterUserArgs {
  user: Omit<User, '_id'>
}

interface IRegisterUserResponse {
  user: Omit<User, 'password'>
}

export const useRegisterUser = () => {
  return useMutation(({ user }: IRegisterUserArgs) =>
    post<IRegisterUserResponse>({ path: '/register', body: user })
  )
}
