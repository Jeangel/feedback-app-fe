import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { Center, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import LoginForm from '@components/authentication/LoginForm'
import { LockIcon } from '@chakra-ui/icons'
import RegisterForm from '@components/authentication/RegisterForm'
import RoundedBadge from '@components/RoundedBadge'

const Authentication: NextPage = () => {
  const router = useRouter()
  const isRegister = router.pathname === '/register'
  return (
    <Center bg='gray.50' minH='100vh' p='5'>
      <Flex
        bg='white'
        minW={['100%', '450px']}
        borderRadius='10px'
        px='5'
        pos='relative'
        py='14'
      >
        <RoundedBadge icon={LockIcon} pos='absolute' left='6' top='-6' />
        <Tabs w='full' defaultIndex={isRegister ? 1 : 0}>
          <TabList>
            <Tab w='full'>Login</Tab>
            <Tab w='full'>Register</Tab>
          </TabList>
          <TabPanels py='6' px='4'>
            <TabPanel>
              <LoginForm />
            </TabPanel>
            <TabPanel>
              <RegisterForm />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Center>
  )
}

export default Authentication
