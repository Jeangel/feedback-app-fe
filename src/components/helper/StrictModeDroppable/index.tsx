import { useEffect, useState } from 'react'
import { Droppable, DroppableProps } from 'react-beautiful-dnd'

/**
 * Workaround for react-beautiful-dnd working on React 18 without removing StrictMode
 * Open issue: https://github.com/atlassian/react-beautiful-dnd/issues/2399
 */
export const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true))

    return () => {
      cancelAnimationFrame(animation)
      setEnabled(false)
    }
  }, [])

  if (!enabled) {
    return null
  }

  return <Droppable {...props}>{children}</Droppable>
}
