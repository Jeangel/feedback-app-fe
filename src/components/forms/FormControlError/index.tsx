import { FormErrorMessage } from '@chakra-ui/react'
import { FieldError } from 'react-hook-form'

interface IFormControlError {
  error?: string | FieldError
}

const FormControlError = ({ error }: IFormControlError) => {
  if (!error) return null
  return (
    <FormErrorMessage mt='0' fontSize='12px'>
      {typeof error === 'string' ? error : error.message}
    </FormErrorMessage>
  )
}

export default FormControlError
