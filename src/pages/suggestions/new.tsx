import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import withAuth from '@hocs/withAuth'
import {
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Text,
  Input,
  Textarea,
  VStack,
  Button,
  useBoolean,
  useToast,
  Stack,
} from '@chakra-ui/react'
import { HiPlus } from 'react-icons/hi'
import RoundedBadge from '@components/misc/RoundedBadge'
import GoBackButton from '@components/navigation/GoBackButton'
import CenterTemplate from '@components/template/CenterTemplate'
import FormControlError from '@components/forms/FormControlError'
import * as yup from 'yup'
import { YupSchemaKeys } from 'types/yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Select from '@components/forms/Select'
import { useRouter } from 'next/router'
import { ApiError } from '@utils/axios'
import { EFeedbackCategory, feedbackCategoryOptions } from 'types/FeedbackCategory'
import { useCreateFeedback } from '@hooks/api/useCreateFeedback'

interface INewSuggestionForm {
  title: string
  category: EFeedbackCategory
  description: string
}

const validationSchema = yup.object<YupSchemaKeys<INewSuggestionForm>>({
  title: yup.string().label('Feedback Title').required().min(5).max(50),
  category: yup.string().label('Category').required(),
  description: yup.string().label('Feedback Detail').required().min(20).max(600),
})

const NewSuggestion: NextPage = (props) => {
  const router = useRouter()
  const {
    register,
    handleSubmit: makeHandleOnSubmit,
    formState: { errors, isValid },
    setValue,
    reset,
  } = useForm<INewSuggestionForm>({
    resolver: yupResolver(validationSchema),
    mode: 'onTouched',
  })
  const { mutate: createFeedback, isLoading } = useCreateFeedback()
  const [category, setCategory] = useState<EFeedbackCategory | undefined>(undefined)
  const toast = useToast()

  const handleOnCategoryChange = (value: EFeedbackCategory) => {
    setValue('category', value)
    setCategory(value)
  }

  const handleOnCancel = () => {
    router.back()
  }

  const handleOnSubmit = async (values: INewSuggestionForm) => {
    createFeedback(
      { feedback: values },
      {
        onSuccess: () => {
          toast({
            status: 'success',
            description: 'Feedback was created successfully',
          })
          router.back()
        },
        onError: (error) => {
          const apiError = error as ApiError
          toast({ status: 'error', description: apiError.message })
        },
      }
    )
  }

  useEffect(() => {
    register('category')
  }, [])

  return (
    <CenterTemplate withNavbar={false}>
      <Flex justifyContent='flex-start'>
        <GoBackButton />
      </Flex>
      <Flex w='full' pt='55px' justifyContent='center'>
        <Flex
          w='100%'
          px='24px'
          py='44px'
          bg='white'
          pos='relative'
          borderRadius='10px'
          maxW={{ sm: '100%', md: '540px', lg: '540px' }}
          direction='column'
        >
          <RoundedBadge
            boxSize='40px'
            icon={HiPlus}
            pos='absolute'
            left='24px'
            top='-20px'
          />
          <Heading variant='h3' mb='24px'>
            Create New Feedback.
          </Heading>
          <form onSubmit={makeHandleOnSubmit(handleOnSubmit)}>
            <VStack spacing={6}>
              <FormControl id='title' isInvalid={!!errors.title}>
                <FormLabel>Feedback Title</FormLabel>
                <Text variant='controlDescription'>
                  Add a short, descriptive headline
                </Text>
                <Input {...register('title')} />
                <FormControlError error={errors.title} />
              </FormControl>
              <FormControl id='category' isInvalid={!!errors.category}>
                <FormLabel>Category</FormLabel>
                <Text variant='controlDescription'>
                  Choose a category for your feedback.
                </Text>
                <Select
                  options={feedbackCategoryOptions}
                  value={category}
                  onChange={handleOnCategoryChange}
                />
                <FormControlError error={errors.category} />
              </FormControl>
              <FormControl id='description' isInvalid={!!errors.description}>
                <FormLabel>Feedback Detail</FormLabel>
                <Text variant='controlDescription'>
                  Include any specific comments on what should be improved, added, etc.
                </Text>
                <Textarea resize='none' h='120px' {...register('description')} />
                <FormControlError error={errors.description} />
              </FormControl>
            </VStack>
            <Stack
              direction={{ sm: 'column', lg: 'row' }}
              spacing={4}
              mt={{ sm: '40px', lg: '20px' }}
              justifyContent={{ sm: 'center', lg: 'flex-end' }}
            >
              <Button
                colorScheme='primary'
                w={{ sm: 'full', lg: 'auto' }}
                type='submit'
                isLoading={isLoading}
                isDisabled={!isValid}
              >
                Add Feedback
              </Button>
              <Button
                colorScheme='tertiary'
                w={{ sm: 'full', lg: 'auto' }}
                onClick={handleOnCancel}
              >
                Cancel
              </Button>
            </Stack>
          </form>
        </Flex>
      </Flex>
    </CenterTemplate>
  )
}

export default withAuth(NewSuggestion)
