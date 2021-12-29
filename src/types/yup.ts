import { AnySchema } from 'yup'

export type YupSchemaKeys<FormValues> = Record<keyof FormValues, AnySchema>