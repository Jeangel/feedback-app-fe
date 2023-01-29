import {
  IconButton,
  IconButtonProps,
  PlacementWithLogical,
  Tooltip,
} from '@chakra-ui/react'
import { ImMagicWand } from 'react-icons/im'

interface IAutoFillButtonProps {
  tooltipPlacement?: PlacementWithLogical
  variant?: IconButtonProps['variant']
  colorScheme?: IconButtonProps['colorScheme']
  size?: IconButtonProps['size']
  onClick: IconButtonProps['onClick']
}

const AutoFillButton = ({
  tooltipPlacement = 'top',
  variant = 'outline',
  colorScheme = 'primary',
  size = 'sm',
  onClick,
}: IAutoFillButtonProps) => (
  <Tooltip label='Auto Fill Form' placement={tooltipPlacement}>
    <IconButton
      aria-label='Auto Fill Form'
      icon={<ImMagicWand />}
      variant={variant}
      colorScheme={colorScheme}
      size={size}
      onClick={onClick}
    />
  </Tooltip>
)

export default AutoFillButton
