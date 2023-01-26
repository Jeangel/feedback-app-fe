import { Box } from '@chakra-ui/react'
import RoadmapBoard from '@components/roadmap/RoadmapBoard'
import RoadmapNav from '@components/roadmap/RoadmapNav'
import CenterTemplate from '@components/template/CenterTemplate'
import { useBoardSuggestions } from '@hooks/api/suggestions/useBoardSuggestions'
import type { NextPage } from 'next'

const Roadmap: NextPage = () => {
  const { columns } = useBoardSuggestions()
  return (
    <CenterTemplate
      gridColumn={{ base: '1 / 13', md: '3 / 11', lg: '3 / 11' }}
      baseGridProps={{
        p: {
          sm: 0,
          base: '24px',
          md: '30px',
          lg: '30px',
        },
      }}
    >
      <RoadmapNav />
      <Box pt='10px'>
        <RoadmapBoard columns={columns} />
      </Box>
    </CenterTemplate>
  )
}

export default Roadmap
