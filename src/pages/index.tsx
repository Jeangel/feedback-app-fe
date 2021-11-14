import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Button, Text, useColorMode } from '@chakra-ui/react'

const Home: NextPage = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <header>
      <Text>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit.
        Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis
        vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales
        leo, eget blandit nunc tortor eu nibh. Nullam mollis.
      </Text>
      <Button colorScheme='tertiary'>Hey!!</Button>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
    </header>
  )
}

export default Home
