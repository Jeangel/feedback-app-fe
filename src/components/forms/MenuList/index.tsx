import { CheckIcon } from '@chakra-ui/icons'
import {
  MenuList as ChakraMenuList,
  MenuOptionGroup,
  MenuItemOption,
  Flex,
  MenuDivider,
  SystemProps,
  MenuListProps,
  MenuItemOptionProps,
} from '@chakra-ui/react'
import React from 'react'

export type MenuListOption = { label: string; value: string }

export interface IChakraMenuListProps {
  options: MenuListOption[]
  value?: string
  onChange: (value: string) => void
  menuListProps?: MenuListProps
  menuItemOptionProps?: MenuItemOptionProps
}

const MenuList = ({
  value,
  options,
  onChange,
  menuListProps,
  menuItemOptionProps,
}: IChakraMenuListProps) => {
  const handleOnChange = (value: string | string[]) => {
    const emittedValue = typeof value === 'string' ? value : value[0]
    onChange(emittedValue)
  }
  return (
    <ChakraMenuList minWidth='240px' {...menuListProps}>
      <MenuOptionGroup type='radio' value={value} onChange={handleOnChange}>
        {options.map((option, index) => (
          <React.Fragment key={index}>
            <MenuItemOption
              iconSpacing='0'
              {...menuItemOptionProps}
              value={option.value}
              onClick={() => onChange(option.value)}
            >
              <Flex as='span' justify='space-between' align='center'>
                {option.label}
                {value === option.value && (
                  <CheckIcon color='primary.500' height='11px' width='11px' />
                )}
              </Flex>
            </MenuItemOption>
            {index !== options.length - 1 && <MenuDivider />}
          </React.Fragment>
        ))}
      </MenuOptionGroup>
    </ChakraMenuList>
  )
}

export default MenuList
