import User from '@app-types/User'
import { post } from '@utils/axios'

interface IRegisterUserArgs {
  user: Omit<User, '_id'>
}

interface IRegisterUserResponse {
  user: Omit<User, 'password'>
}

export const registerUser = async ({ user }: IRegisterUserArgs) => {
  return post<IRegisterUserResponse>({ path: '/register', body: user })
}
