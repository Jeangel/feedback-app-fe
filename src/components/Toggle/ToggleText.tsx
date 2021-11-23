import { Text, TextProps } from '@chakra-ui/react'

interface IToggleTextProps extends TextProps {
  label: string
}

const ToggleText = ({ label, ...rest }: IToggleTextProps) => (
  <Text {...rest} as='span'>
    {label.slice(0, 5)}
  </Text>
)

export default ToggleText
