import React from 'react'
import { FormErrorMessage } from '@chakra-ui/react'
import { FieldError } from 'react-hook-form'

interface IFormControlError {
  error?: string | FieldError
}

const FormControlError = ({ error }: IFormControlError) => {
  console.log(error)
  if (!error) return null
  return (
    <FormErrorMessage>
      {typeof error === 'string' ? error : error.message}
    </FormErrorMessage>
  )
}

export default FormControlError
