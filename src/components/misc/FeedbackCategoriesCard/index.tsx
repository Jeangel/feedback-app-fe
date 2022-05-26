import { EFeedbackCategory } from '@app-types/FeedbackCategory'
import { Flex } from '@chakra-ui/react'
import Toggle from '@components/forms/Toggle'

const FeedbackCategoriesCard = () => {
  return (
    <Flex
      h='178px'
      w='full'
      minW='223px'
      p='24px'
      bg='white'
      borderRadius='10px'
      flexWrap='wrap'
      rowGap='8px'
      columnGap='8px'
    >
      <Toggle
        size='sm'
        label='All'
        isToggled
        onToggle={function (toggled: boolean): void {
          throw new Error('Function not implemented.')
        }}
      />
      {Object.keys(EFeedbackCategory).map((feedbackCategory) => (
        <Toggle
          key={feedbackCategory}
          size='sm'
          label={feedbackCategory}
          isToggled={false}
          onToggle={function (toggled: boolean): void {
            throw new Error('Function not implemented.')
          }}
        />
      ))}
    </Flex>
  )
}

export default FeedbackCategoriesCard
