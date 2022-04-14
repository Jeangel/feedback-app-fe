import { Button, ButtonProps } from '@chakra-ui/react'

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
  const handleOnToggle = () => {
    onToggle(!isToggled)
  }
  return (
    <Button
      {...rest}
      onClick={handleOnToggle}
      flexDirection='column'
      size='none'
    >
      {children}
    </Button>
  )
}

export default ToggleTrigger
