import type { NextPage } from 'next'
import React, { useState } from 'react'
import {
  Center,
  Flex,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import LoginForm from '@components/Authentication/LoginForm'
import { LockIcon } from '@chakra-ui/icons'
import RegisterForm from '@components/Authentication/RegisterForm'
import RoundedBadge from '@components/RoundedBadge'

const Home: NextPage = () => {
  return (
    <Center bg='gray.50' minH='100vh' p='5'>
      <Flex
        bg='white'
        minW={['100%', '450px']}
        // minH='300px'
        borderRadius='10px'
        px='5'
        pos='relative'
        py='14'
      >
        <RoundedBadge icon={LockIcon} pos='absolute' left='6' top='-6' />
        <Tabs w='full'>
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

export default Home
