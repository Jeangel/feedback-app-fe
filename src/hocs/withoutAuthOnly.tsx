import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const withoutAuthOnly = (Component: React.ComponentType<any>) => {
  const Auth = (props: any) => {
    const { data, status } = useSession()
    const router = useRouter()

    console.log('withoutAuthOnly', { data, status })
    useEffect(() => {
      if (status === 'authenticated') {
        router.push('/home')
      }
    }, [status])

    if (['loading', 'authenticated'].includes(status)) {
      return <p>Loading</p>
    }

    return <Component {...props} />
  }

  return Auth
}

export default withoutAuthOnly
