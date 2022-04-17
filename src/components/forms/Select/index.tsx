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

interface ISelectProps {
  options: MenuListOption[]
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  triggerProps?: SystemProps
  menuListProps?: SystemProps
  menuItemOptionProps?: SystemProps
  placeholderProps?: TextProps
  iconProps?: IconProps
  variant?: 'select-input' | 'select-ghost'
}

const Select = ({
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
}: ISelectProps) => {
  return (
    <Menu closeOnBlur closeOnSelect>
      <MenuButton
        as={Button}
        variant={variant}
        rightIcon={<ChevronDownIcon color='secondary.500' {...iconProps} />}
        textAlign='left'
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
        onChange={onChange}
        menuItemOptionProps={menuItemOptionProps}
        menuListProps={menuListProps}
      />
    </Menu>
  )
}

export default Select
