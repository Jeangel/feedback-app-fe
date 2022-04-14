import { Button, Box } from '@chakra-ui/react'
import withAuth from 'hocs/withAuth'
import type { NextPage } from 'next'
import React from 'react'

const Suggestions: NextPage = (props) => {
  return (
    <Box p='20'>
      <p>Suggestions page</p>
    </Box>
  )
}

export default withAuth(Suggestions)
