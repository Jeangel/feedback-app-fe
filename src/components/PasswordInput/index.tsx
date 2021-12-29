import React from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  Input,
  InputGroup,
  InputRightElement,
  useBoolean,
  IconButton,
  InputProps,
  InputGroupProps,
} from '@chakra-ui/react'

interface IPasswordInputProps extends Omit<InputProps, 'type'> {
  containerProps?: InputGroupProps
}

const PasswordInput = ({ containerProps, ...inputProps }: IPasswordInputProps) => {
  const [isShowing, { toggle }] = useBoolean(false)

  return (
    <InputGroup size='md' {...containerProps}>
      <Input
        pr='4.5rem'
        type={isShowing ? 'text' : 'password'}
        placeholder='Enter password'
        {...inputProps}
      />
      <InputRightElement width='4.5rem'>
        <IconButton
          icon={isShowing ? <ViewOffIcon /> : <ViewIcon />}
          aria-label={isShowing ? 'Hide Password' : 'Show Password'}
          variant='unstyled'
          onClick={toggle}
        />
      </InputRightElement>
    </InputGroup>
  )
}

export default PasswordInput
