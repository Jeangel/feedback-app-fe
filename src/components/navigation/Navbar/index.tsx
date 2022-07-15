import {
  Box,
  Flex,
  IconButton,
  Icon,
  Heading,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
  VStack,
  ChakraProps,
} from '@chakra-ui/react'
import ProfileCard from '@components/misc/ProfileCard'
import { useSession } from 'next-auth/react'
import { useRef } from 'react'
import { RiMenuFill } from 'react-icons/ri'

interface INavbarProps extends ChakraProps {
  children?: React.ReactNode
}

const Navbar = (props: INavbarProps) => {
  const { data } = useSession()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null)
  return (
    <Box {...props} display={{ sm: 'block', md: 'none' }}>
      <Flex
        minH='72px'
        bg='primary-gradient.300'
        alignItems='center'
        justify='space-between'
        p='16px 24px'
      >
        <Box>
          <Heading variant='h2' color='white'>
            {data?.user.fullName}
          </Heading>
        </Box>
        <IconButton
          icon={<Icon as={RiMenuFill} />}
          variant='link'
          color='white'
          fontSize='25px'
          aria-label='Main Menu'
          background='transparent'
          ref={btnRef}
          onClick={onOpen}
        />
      </Flex>
      <Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent maxW={270} p={6} bg='gray.50'>
          <Flex justify='flex-end' pb={6}>
            <DrawerCloseButton pos='static' />
          </Flex>
          <VStack spacing={6}>
            <ProfileCard />
            {props.children}
          </VStack>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

export default Navbar
