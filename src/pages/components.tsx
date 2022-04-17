import type { NextPage } from 'next'
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from '@chakra-ui/icons'
import {
  Button,
  Text,
  Heading,
  useColorMode,
  HStack,
  Input,
  useBoolean,
  Badge,
} from '@chakra-ui/react'
import Select from '@components/forms/Select'
import React, { useState } from 'react'
import Toggle from '@components/forms/Toggle'

const Components: NextPage = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const [value, setValue] = useState('')
  const [isToggled, { toggle }] = useBoolean()
  const selectOptions = [
    { label: 'Test', value: 'test' },
    { label: 'Test2', value: 'test2' },
    { label: 'Test3', value: 'test3' },
    { label: 'Test4', value: 'test4' },
  ]
  return (
    <div style={{ padding: 20 }}>
      <Text>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit.
        Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis
        vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales
        leo, eget blandit nunc tortor eu nibh. Nullam mollis.
      </Text>
      <br />
      <Text variant='body2'>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit.
        Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis
        vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales
        leo, eget blandit nunc tortor eu nibh. Nullam mollis.
      </Text>
      <br />
      <Text variant='body3'>
        Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus
        libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida
        id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at
        felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu
        pulvinar nunc sapien ornare nisl. Phasellus pede arcu
      </Text>
      <Heading variant='h1'>Sed egestas ante et vulputate volutpat</Heading>
      <Heading variant='h2'>Vestibulum volutpat acus a ultrices sagittis</Heading>
      <Heading variant='h3'>Pellentesque a diam sit amet mi ullamcorper vehicula</Heading>
      <Heading variant='h4'>Ut scelerisque hendrerit tellus. Integer sagittis</Heading>
      <br />
      <hr />
      <br />
      <HStack spacing='2'>
        <Button colorScheme='primary'>Button 1</Button>
        <Button colorScheme='secondary'>Button 1</Button>
        <Button colorScheme='tertiary'>Button 1</Button>
        <Button colorScheme='danger'>Button 1</Button>
        <Button onClick={toggleColorMode}>
          Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
        </Button>
      </HStack>
      <br />
      <hr />
      <br />
      <HStack spacing='2'>
        <Input placeholder='testy' maxW='md' />
        <Input placeholder='testy' maxW='md' isInvalid />
      </HStack>
      <br />
      <hr />
      <br />
      <HStack spacing='2'>
        <Select
          placeholder='testy'
          value={value}
          onChange={setValue}
          triggerProps={{ minW: '200px' }}
          options={selectOptions}
        />
        <Select
          placeholder='testy'
          value={value}
          onChange={setValue}
          variant='select-ghost'
          triggerProps={{ minW: '200px' }}
          options={selectOptions}
        />
      </HStack>
      <br />
      <hr />
      <br />
      <HStack spacing='2'>
        <Toggle isToggled={isToggled} label='UX' onToggle={toggle} size='sm' />
        <Toggle
          isToggled={isToggled}
          label='50'
          onToggle={toggle}
          orientation='vertical'
          topIcon={ChevronUpIcon}
        />
        <Toggle
          isToggled={isToggled}
          label='UX'
          onToggle={toggle}
          orientation='vertical'
          bottomIcon={ChevronDownIcon}
        />
        <Toggle
          isToggled={isToggled}
          label='UX'
          onToggle={toggle}
          leftIcon={ChevronLeftIcon}
          size='lg'
        />
        <Toggle
          isToggled={isToggled}
          label='UX'
          onToggle={toggle}
          rightIcon={ChevronRightIcon}
        />
      </HStack>
      <br />
      <hr />
      <br />
      <HStack spacing='2'>
        <Badge colorScheme='primary'>Enhancement</Badge>
        <Badge colorScheme='secondary'>Feature</Badge>
        <Badge colorScheme='tertiary'>Bug</Badge>
        <Badge colorScheme='danger'>UI</Badge>
        <Badge variant='feedbackTag'>UX</Badge>
      </HStack>
    </div>
  )
}

export default Components
