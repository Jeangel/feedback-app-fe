import { Flex } from '@chakra-ui/react'
import styles from './spinner.module.css'

export default () => (
  <Flex alignItems='center' justifyContent='center' h='full' bg='gray.50'>
    <div className={styles.spinner} />
  </Flex>
)
