import { useState, useEffect } from 'react'

const useIsWindowReady = () => {
  const [isWindowReady, setIsWindowReady] = useState(false)

  useEffect(() => {
    setIsWindowReady(typeof window !== 'undefined')
  }, [])

  return isWindowReady
}

export default useIsWindowReady
