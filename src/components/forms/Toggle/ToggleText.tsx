import { Text, TextProps } from '@chakra-ui/react'

interface IToggleTextProps extends TextProps {
  label: string
}

const ToggleText = ({ label, ...rest }: IToggleTextProps) => (
  <Text {...rest} as='span'>
    {label}
  </Text>
)

export default ToggleText
