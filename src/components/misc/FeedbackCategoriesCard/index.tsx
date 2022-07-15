import { EFeedbackCategory } from '@app-types/FeedbackCategory'
import { Flex } from '@chakra-ui/react'
import Toggle from '@components/forms/Toggle'

interface IFeedbackCategoriesCardProps {
  selectedValues: EFeedbackCategory[]
  onToggle: (values: EFeedbackCategory[]) => void
}

const FeedbackCategoriesCard = ({
  onToggle,
  selectedValues,
}: IFeedbackCategoriesCardProps) => {
  const handleOnToggle = (value: EFeedbackCategory) => {
    if (selectedValues.includes(value)) {
      onToggle(selectedValues.filter((e) => e !== value))
    } else {
      onToggle(selectedValues.concat(value))
    }
  }
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
        isToggled={!selectedValues.length}
        onToggle={() => onToggle([])}
      />
      {Object.keys(EFeedbackCategory).map((feedbackCategory) => (
        <Toggle
          key={feedbackCategory}
          size='sm'
          label={feedbackCategory}
          isToggled={selectedValues.includes(feedbackCategory as EFeedbackCategory)}
          onToggle={() => handleOnToggle(feedbackCategory as EFeedbackCategory)}
        />
      ))}
    </Flex>
  )
}

export default FeedbackCategoriesCard
