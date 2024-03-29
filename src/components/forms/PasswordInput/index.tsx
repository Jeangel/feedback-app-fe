import { forwardRef } from 'react'
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

const PasswordInput = (
  { containerProps, ...inputProps }: IPasswordInputProps,
  ref: React.Ref<HTMLInputElement>
) => {
  const [isShowing, { toggle }] = useBoolean(false)
  return (
    <InputGroup size='md' {...containerProps}>
      <Input
        pr='4.5rem'
        type={isShowing ? 'text' : 'password'}
        {...inputProps}
        ref={ref}
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

export default forwardRef(PasswordInput)
