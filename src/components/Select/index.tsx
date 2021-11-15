import { ChevronDownIcon, CheckIcon } from '@chakra-ui/icons'
import { Button, Menu, MenuButton, SystemProps } from '@chakra-ui/react'
import MenuList, { MenuListOption } from '../MenuList'

interface ISelectProps {
  options: MenuListOption[]
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  triggerProps?: SystemProps
  menuListProps?: SystemProps
  menuItemOptionProps?: SystemProps
}

const Select = ({
  options,
  value,
  onChange,
  placeholder,
  triggerProps,
  menuListProps,
  menuItemOptionProps,
}: ISelectProps) => {
  return (
    <Menu closeOnBlur closeOnSelect={false}>
      <MenuButton
        as={Button}
        variant='input'
        rightIcon={<ChevronDownIcon color='secondary.500' />}
        textAlign='left'
        {...triggerProps}
      >
        {options.find((e) => e.value === value)?.label || placeholder}
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
