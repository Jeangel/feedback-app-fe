import React, { useEffect, useState } from 'react'
import type { NextPage, GetServerSidePropsContext } from 'next'
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
  useToast,
  Stack,
} from '@chakra-ui/react'
import { FiEdit2 } from 'react-icons/fi'
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
import { useUpdateFeedback } from '@hooks/api/useUpdateFeedback'
import { EFeedbackStatus, feedbackStatusOptions } from '@app-types/FeedbackStatus'
import { fetchSuggestion } from '@hooks/api/useSuggestion'
import IFeedback from '@app-types/Feedback'

interface IEditSuggestionForm {
  title: string
  category: EFeedbackCategory
  status: EFeedbackStatus
  description: string
}

const validationSchema = yup.object<YupSchemaKeys<IEditSuggestionForm>>({
  title: yup.string().label('Feedback Title').required().min(5).max(50),
  category: yup.string().label('Category').required(),
  status: yup.string().label('Status').required(),
  description: yup.string().label('Feedback Detail').required().min(20).max(200),
})

interface IEditSuggestionProps {
  suggestion: IFeedback | null
}

const EditSuggestion: NextPage<IEditSuggestionProps> = ({ suggestion }) => {
  const router = useRouter()
  const {
    register,
    handleSubmit: makeHandleOnSubmit,
    formState: { errors, isValid },
    setValue,
    reset,
  } = useForm<IEditSuggestionForm>({
    resolver: yupResolver(validationSchema),
    mode: 'onTouched',
    defaultValues: suggestion || {},
  })
  const { mutate: updateFeedback, isLoading } = useUpdateFeedback()
  const [category, setCategory] = useState<EFeedbackCategory | undefined>(
    suggestion?.category
  )
  const [status, setStatus] = useState<EFeedbackStatus | undefined>(suggestion?.status)
  const toast = useToast()

  const handleOnCategoryChange = (value: EFeedbackCategory) => {
    setValue('category', value)
    setCategory(value)
  }

  const handleOnStatusChange = (value: EFeedbackStatus) => {
    setValue('status', value)
    setStatus(value)
  }

  const handleOnCancel = () => {
    router.back()
  }

  const handleOnSubmit = async (values: IEditSuggestionForm) => {
    if (!suggestion) return

    const updates = { ...values, _id: suggestion._id }
    updateFeedback(
      { feedback: updates },
      {
        onSuccess: () => {
          toast({
            status: 'success',
            description: 'Feedback was updated successfully',
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
    register('status')
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
            icon={FiEdit2}
            pos='absolute'
            left='24px'
            top='-20px'
          />
          <Heading variant='h3' mb='24px'>
            Editing
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
              <FormControl id='status' isInvalid={!!errors.status}>
                <FormLabel>Status</FormLabel>
                <Text variant='controlDescription'>Change feature state</Text>
                <Select
                  options={feedbackStatusOptions}
                  value={status}
                  onChange={handleOnStatusChange}
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
                Save Changes
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

interface IPageParams {
  id: string
  [k: string]: string | string[] | undefined
}

export async function getServerSideProps(
  context: GetServerSidePropsContext<IPageParams>
) {
  let suggestion = null
  if (context.params?.id) {
    try {
      const suggestionId = context.params.id
      const response = await fetchSuggestion({
        id: suggestionId,
        ssr: {
          contextOrRequest: context,
        },
      })
      suggestion = response.data
    } catch (error) {}
  }

  return { props: { suggestion } }
}

export default withAuth(EditSuggestion)
