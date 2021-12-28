import { Box, Image, IconButton } from '@chakra-ui/react'
import { Icon } from '@chakra-ui/icon'
import { FaRandom } from 'react-icons/fa'
import useRandomAvatar from '@hooks/useRandomAvatar'
import { useEffect } from 'react'
import { isFunction } from '@utils/is'

interface IAvatarPickerProps {
  onChange?: (avatar: string) => void
}

const AvatarPicker = ({ onChange }: IAvatarPickerProps) => {
  const { avatar, shuffle } = useRandomAvatar()
  useEffect(() => {
    if (isFunction(onChange)) {
      onChange(avatar)
    }
  }, [avatar])
  return (
    <Box pos='relative'>
      <Image src={avatar} boxSize='100px' alt='Avatar Image' />
      <IconButton
        aria-label='Next Random Avatar'
        onClick={shuffle}
        icon={<Icon as={FaRandom} />}
        colorScheme='primary'
        fontSize='10px'
        rounded='full'
        size='xs'
        pos='absolute'
        right='0'
        bottom='-10px'
      />
    </Box>
  )
}

export default AvatarPicker
