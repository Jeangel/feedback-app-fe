import { ButtonProps, Box, useStyleConfig, CSSObject } from '@chakra-ui/react'
import { Icon } from '@chakra-ui/icons'
import ToggleTrigger from './ToggleTrigger'
import ToggleText from './ToggleText'

interface IToggleProps extends Omit<ButtonProps, 'leftIcon' | 'rightIcon'> {
  label: string
  isToggled: boolean
  onToggle: (toggled: boolean) => void
  topIcon?: React.ElementType<any>
  bottomIcon?: React.ElementType<any>
  leftIcon?: React.ElementType<any>
  rightIcon?: React.ElementType<any>
}

const Toggle = ({
  label,
  isToggled,
  onToggle,
  topIcon,
  bottomIcon,
  leftIcon,
  rightIcon,
  size,
  variant,
  orientation,
  ...rest
}: IToggleProps) => {
  const result = useStyleConfig('Toggle', { size, variant, orientation, isToggled })
  const {
    trigger: triggerStyles,
    icon: iconStyles,
    text: textStyles,
  } = result as Record<string, CSSObject>
  return (
    <Box role='group' height='min-content'>
      <ToggleTrigger
        onToggle={onToggle}
        isToggled={isToggled}
        sx={triggerStyles}
        {...rest}
      >
        {topIcon && <Icon as={topIcon} sx={iconStyles} />}
        <Box
          as='span'
          display='flex'
          alignItems='center'
          justifyContent='center'
          w='full'
          padding='0 10px'
          columnGap='10px'
        >
          {leftIcon && <Icon as={leftIcon} sx={iconStyles} m='0' />}
          <ToggleText label={label} sx={textStyles} />
          {rightIcon && <Icon as={rightIcon} sx={iconStyles} m='0' />}
        </Box>
        {bottomIcon && <Icon as={bottomIcon} sx={iconStyles} />}
      </ToggleTrigger>
    </Box>
  )
}

export default Toggle
