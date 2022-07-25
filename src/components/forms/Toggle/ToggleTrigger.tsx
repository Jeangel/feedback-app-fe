import { Button, ButtonProps } from '@chakra-ui/react'
import { MouseEventHandler } from 'react'

interface IToggleTriggerProps extends ButtonProps {
  onToggle: (isToggled: boolean) => void
  isToggled: boolean
}

const ToggleTrigger = ({
  isToggled,
  onToggle,
  children,
  ...rest
}: IToggleTriggerProps) => {
  const handleOnToggle: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    onToggle(!isToggled)
  }
  return (
    <Button {...rest} onClick={handleOnToggle} flexDirection='column' size='sm'>
      {children}
    </Button>
  )
}

export default ToggleTrigger
