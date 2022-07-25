import { Box, Button, ListItem, List, ButtonProps, BoxProps } from '@chakra-ui/react'
import { useMemo } from 'react'
import { calculatePages, DOTS } from './utils'

interface IPaginationProps {
  onPageChange: (page: number) => void
  totalPages: number
  currentPage: number
  maxVisibleItems?: number
}

const PaginationButton = (props: ButtonProps) => (
  <Button {...props} colorScheme='secondary' h='40px' w='40px' />
)

const DotsBox = (props: BoxProps) => (
  <Box
    {...props}
    height='40px'
    display='flex'
    alignItems='center'
    justifyContent='center'
  />
)

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  maxVisibleItems = 3,
}: IPaginationProps) => {
  const pages = useMemo(() => {
    return calculatePages({ totalPages, currentPage, maxVisibleItems })
  }, [totalPages, currentPage, maxVisibleItems])
  return (
    <List as='ul' display='flex' justifyContent='center' columnGap='10px'>
      {pages.map((page) => (
        <ListItem key={`page-${page}`}>
          {page === DOTS ? (
            <DotsBox color='secondary'>...</DotsBox>
          ) : (
            <PaginationButton
              colorScheme='secondary'
              variant={page === currentPage ? 'solid' : 'ghost'}
              onClick={() => onPageChange(page)}
              key={page}
            >
              {page}
            </PaginationButton>
          )}
        </ListItem>
      ))}
    </List>
  )
}

export default Pagination
