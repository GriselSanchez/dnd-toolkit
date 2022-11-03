import React, { Fragment } from 'react'

import { styled } from '../../../../stitches.config'

const Stat = styled('p', {
  color: '$primary',
  marginBottom: 0,
  b: {
    fontFamily: '$body',
    fontWeight: 600,
    fontSize: '$3',
  },
})

interface Props {
  label?: string
  value?: string
}

const CardStat = ({ label, value }: Props) => {
  return label && value ? (
    <Stat>
      <b>{label} </b>
      {value}
    </Stat>
  ) : (
    <Fragment />
  )
}

export default CardStat
