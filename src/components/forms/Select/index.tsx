import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Button,
  IconProps,
  Menu,
  MenuButton,
  SystemProps,
  Text,
  TextProps,
} from '@chakra-ui/react'
import MenuList, { MenuListOption } from '../MenuList'

interface ISelectProps<T = string> {
  id?: string
  options: MenuListOption[]
  value?: T
  onChange: (value: T) => void
  placeholder?: string
  triggerProps?: SystemProps
  menuListProps?: SystemProps
  menuItemOptionProps?: SystemProps
  placeholderProps?: TextProps
  iconProps?: IconProps
  variant?: 'select-input' | 'select-ghost'
}

const Select = <T extends string = string>({
  id,
  options,
  value,
  onChange,
  placeholder,
  triggerProps,
  menuListProps,
  menuItemOptionProps,
  placeholderProps,
  iconProps,
  variant = 'select-input',
}: ISelectProps<T>) => {
  const handleOnChange = (value: string) => {
    onChange(value as T)
  }

  return (
    <Menu closeOnBlur closeOnSelect>
      <MenuButton
        id={id}
        as={Button}
        variant={variant}
        rightIcon={<ChevronDownIcon color='secondary.500' {...iconProps} />}
        textAlign='left'
        w='full'
        {...triggerProps}
      >
        {options.find((e) => e.value === value)?.label || (
          <Text fontSize='sm' color='gray.400' {...placeholderProps} as='span'>
            {placeholder}
          </Text>
        )}
      </MenuButton>
      <MenuList
        value={value}
        options={options}
        onChange={handleOnChange}
        menuItemOptionProps={menuItemOptionProps}
        menuListProps={menuListProps}
      />
    </Menu>
  )
}

export default Select
