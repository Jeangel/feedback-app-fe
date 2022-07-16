import { ESuggestionCategory } from '@app-types/SuggestionCategory'
import { Flex } from '@chakra-ui/react'
import Toggle from '@components/forms/Toggle'

interface ISuggestionCategoriesCardProps {
  selectedValues: ESuggestionCategory[]
  onToggle: (values: ESuggestionCategory[]) => void
}

const SuggestionCategoriesCard = ({
  onToggle,
  selectedValues,
}: ISuggestionCategoriesCardProps) => {
  const handleOnToggle = (value: ESuggestionCategory) => {
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
      {Object.keys(ESuggestionCategory).map((suggestionCategory) => (
        <Toggle
          key={suggestionCategory}
          size='sm'
          label={suggestionCategory}
          isToggled={selectedValues.includes(suggestionCategory as ESuggestionCategory)}
          onToggle={() => handleOnToggle(suggestionCategory as ESuggestionCategory)}
        />
      ))}
    </Flex>
  )
}

export default SuggestionCategoriesCard
