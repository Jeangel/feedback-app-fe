import { Player } from '@lottiefiles/react-lottie-player'
import animation from './empty-box.json'

interface IEmptyBoxProps {
  style?: React.CSSProperties
}

const EmptyBox = ({ style }: IEmptyBoxProps) => {
  const defaultStyle = { width: 130, height: 130 }
  return (
    <Player
      autoplay
      loop
      controls={false}
      src={animation}
      style={{ ...defaultStyle, ...style }}
    />
  )
}

export default EmptyBox
