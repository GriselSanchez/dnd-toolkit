import React, { useState } from 'react'

import { Search, StatBlock } from '../../components'
import { styled } from '../../../stitches.config'
import { MonsterPreview } from '../../types'

const MainContainer = styled('main', {
  alignItems: 'flex-start',
  backgroundColor: '$backgroundLight',
  display: 'flex',
  flexDirection: 'row',
  gap: '$s2',
  justifyContent: 'flex-start',
  padding: '$s1',
})

export default function MonsterMaker() {
  const [selectedMonster, setSelectedMonster] = useState<MonsterPreview>()

  return (
    <MainContainer>
      <Search selectedMonster={selectedMonster} setSelectedMonster={setSelectedMonster} />
      <StatBlock selectedMonster={selectedMonster} />
    </MainContainer>
  )
}
