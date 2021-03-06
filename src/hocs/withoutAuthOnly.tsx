import Spinner from '@components/misc/Spinner'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const withoutAuthOnly = (Component: React.ComponentType<any>) => {
  const Auth = (props: any) => {
    const { data, status } = useSession()
    const router = useRouter()

    useEffect(() => {
      if (status === 'authenticated') {
        router.push('/suggestions')
      }
    }, [status])

    if (['loading', 'authenticated'].includes(status)) {
      return <Spinner />
    }

    return <Component {...props} />
  }

  return Auth
}

export default withoutAuthOnly
