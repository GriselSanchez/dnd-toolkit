import React from 'react'

import { styled } from '../../../../stitches.config'
import { IMonster } from '../../../types'

export const Title = styled('h1', {
  color: '$primary',
  fontFamily: '$title',
  fontSize: '$2',
  fontVariant: 'small-caps',
  fontWeight: 700,
  margin: 0,
})

const CardTitle = ({ name }: Pick<IMonster, 'name'>) => <Title>{name}</Title>

export default CardTitle
