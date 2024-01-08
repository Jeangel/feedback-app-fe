import { useEffect, useState } from 'react'

export const API_URL = 'https://api.dicebear.com/7.x/bottts/svg'

export const useRandomAvatar = () => {
  const [avatar, setAvatar] = useState<string>('')
  const shuffle = () => {
    const seed = new Date().getUTCMilliseconds()
    setAvatar(`${API_URL}?seed=${seed}`)
  }
  useEffect(() => {
    shuffle()
  }, [])
  return { avatar, shuffle }
}
