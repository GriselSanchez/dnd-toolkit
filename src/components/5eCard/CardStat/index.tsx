import React from 'react'

import { STAT } from '../../../constants'
import { styled } from '../../../../stitches.config'
import { MonsterFormatted, Stat } from '../../../types'

const Container = styled('div', {
  alignItems: 'center',
  color: '$primary',
  display: 'flex',
  flexDirection: 'column',
  gap: 0,
  justifyContent: 'center',
})

interface Props {
  name: keyof Stat
  monster: MonsterFormatted
}

const CardStat = ({ name, monster }: Props) => {
  const value = monster[name]
  const modifier = STAT.MODIFIERS[value - 1]

  return (
    <Container>
      <b>{name.toUpperCase().slice(0, 3)}</b>
      <p style={{ marginTop: 5 }}>{`${value} (${modifier})`}</p>
    </Container>
  )
}

export default CardStat
