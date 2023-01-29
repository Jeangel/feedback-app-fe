import SuggestionRoadmapCard, {
  ISuggestionRoadmapCardProps,
} from '@components/suggestion/SuggestionRoadmapCard'
import { useSession } from 'next-auth/react'
import { Draggable } from 'react-beautiful-dnd'

interface CardProps extends ISuggestionRoadmapCardProps {
  index: number
}

const Card = ({ index, suggestion, ...rest }: CardProps) => {
  const { data: session } = useSession()
  const isOwnSuggestion = !!(
    suggestion?.authorId &&
    session?.user._id &&
    suggestion.authorId === session.user._id
  )
  return (
    <Draggable
      draggableId={suggestion ? suggestion._id : `suggestion-card-${index}`}
      index={index}
      isDragDisabled={!isOwnSuggestion}
    >
      {(dragProvided) => (
        <div
          ref={dragProvided.innerRef}
          {...dragProvided.draggableProps}
          {...dragProvided.dragHandleProps}
        >
          <SuggestionRoadmapCard
            suggestion={suggestion}
            {...rest}
            isDragDisabled={!isOwnSuggestion || rest.isDragDisabled}
          />
        </div>
      )}
    </Draggable>
  )
}

export default Card
