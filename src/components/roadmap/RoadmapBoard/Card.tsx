import SuggestionRoadmapCard, {
  ISuggestionRoadmapCardProps,
} from '@components/suggestion/SuggestionRoadmapCard'
import { Draggable } from 'react-beautiful-dnd'

interface CardProps extends ISuggestionRoadmapCardProps {
  index: number
}

const Card = ({ index, suggestion, ...rest }: CardProps) => (
  <Draggable
    draggableId={suggestion ? suggestion._id : `suggestion-card-${index}`}
    index={index}
  >
    {(dragProvided) => (
      <div
        ref={dragProvided.innerRef}
        {...dragProvided.draggableProps}
        {...dragProvided.dragHandleProps}
      >
        <SuggestionRoadmapCard suggestion={suggestion} {...rest} />
      </div>
    )}
  </Draggable>
)

export default Card
