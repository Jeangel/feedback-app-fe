import { useEffect, useState } from 'react'

const API_URL = 'https://avatars.dicebear.com/api/bottts'

const useRandomAvatar = () => {
  const [avatar, setAvatar] = useState<string>('')
  const shuffle = () => {
    const seed = new Date().getUTCMilliseconds()
    setAvatar(`${API_URL}/${seed}.svg`)
  }
  useEffect(() => {
    shuffle()
  }, [])
  return { avatar, shuffle }
}

export default useRandomAvatar
