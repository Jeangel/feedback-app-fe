import Spinner from '@components/misc/Spinner'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const withAuth = (Component: React.ComponentType<any>) => {
  const Auth = (props: any) => {
    const { status } = useSession()
    const router = useRouter()

    useEffect(() => {
      if (status === 'unauthenticated') {
        router.push('/login')
      }
    }, [status])

    if (['loading', 'unauthenticated'].includes(status)) {
      return <Spinner />
    }

    return <Component {...props} />
  }
  return Auth
}

export default withAuth
