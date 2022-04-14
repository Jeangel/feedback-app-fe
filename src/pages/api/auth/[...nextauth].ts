import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { post } from '@utils/axios'
import IUser from 'types/User'

const providers: NextAuthOptions['providers'] = [
  CredentialsProvider({
    name: 'credentials',
    authorize: async (credentials) => {
      const body = {
        username: credentials?.username,
        password: credentials?.password,
      }
      try {
        const { data: response } = await post({ path: '/login', body })
        if (response) {
          return response
        }
      } catch (error) {
        return Promise.reject(error)
      }
      return null
    },
    credentials: {
      username: {},
      password: {},
    },
  }),
]

const callbacks: Partial<NextAuthOptions['callbacks']> = {
  session: ({ session, token }) => {
    if (token) {
      session.accessToken = token.accessToken
      session.user = token.user as IUser
    }
    return session
  },
  jwt: ({ token, user: response }) => {
    if (response) {
      const { token: accessToken, user } = response
      token.accessToken = accessToken
      token.user = user
    }
    return token
  },
}

const pages: NextAuthOptions['pages'] = {
  signIn: 'login',
}

export default (req: any, res: any) => NextAuth(req, res, { providers, callbacks, pages })
