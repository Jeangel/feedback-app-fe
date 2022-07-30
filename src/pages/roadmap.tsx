import { Box } from '@chakra-ui/react'
import RoadmapBoard from '@components/roadmap/RoadmapBoard'
import RoadmapNav from '@components/roadmap/RoadmapNav'
import CenterTemplate from '@components/template/CenterTemplate'
import type { NextPage } from 'next'

const Roadmap: NextPage = () => {
  return (
    <CenterTemplate gridColumn={{ base: '1 / 13', md: '3 / 11', lg: '3 / 11' }}>
      <RoadmapNav />
      <Box pt='10px'>
        <RoadmapBoard />
      </Box>
    </CenterTemplate>
  )
}

export default Roadmap
