import type { NextPage } from 'next'
import Login from './authentication'

const Home: NextPage = (props) => {
  return <Login {...props} />
}

export default Home
