import { useToken } from '@chakra-ui/react'
import NextNProgress from 'nextjs-progressbar'

const NavigationProgressBar = () => {
  const [barColor] = useToken('colors', ['primary.500'])
  return (
    <NextNProgress
      color={barColor}
      startPosition={0.3}
      stopDelayMs={200}
      height={2.5}
      showOnShallow={true}
    />
  )
}

export default NavigationProgressBar
