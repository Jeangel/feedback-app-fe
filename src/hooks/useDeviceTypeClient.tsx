import { useBreakpointValue } from '@chakra-ui/react'

enum EDeviceType {
  desktop = 'desktop',
  tablet = 'tablet',
  mobile = 'mobile',
}

const useDeviceTypeClient = () => {
  const value = useBreakpointValue({
    base: EDeviceType.desktop,
    sm: EDeviceType.mobile,
    md: EDeviceType.tablet,
    lg: EDeviceType.desktop,
  })
  return {
    isDesktop: value === EDeviceType.desktop,
    isMobile: value === EDeviceType.mobile,
    isTablet: value === EDeviceType.tablet,
  }
}

export default useDeviceTypeClient
