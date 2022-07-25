import { Flex } from '@chakra-ui/react'
import styles from './spinner.module.css'

const Spinner = () => (
  <Flex alignItems='center' justifyContent='center' h='full' bg='gray.50'>
    <div className={styles.spinner} />
  </Flex>
)

export default Spinner
