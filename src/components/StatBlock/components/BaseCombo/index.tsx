import React, { Fragment } from 'react'

import { styled } from '../../../../../stitches.config'
import { IBaseCombo } from '../../../../types'

const Title = styled('h3', {
  borderBottom: '1px solid $primary',
  color: '$primary',
  fontSize: '$2',
  marginBottom: 15,
  paddingBottom: 5,
})

interface Props {
  items?: IBaseCombo[]
  title?: string
  description?: string
}

const BaseCombo = ({ items, title, description }: Props) => {
  return items ? (
    <div>
      {title && <Title style={{}}>{title}</Title>}
      {description && <p style={{ fontWeight: 300, fontStyle: 'italic' }}>{description}</p>}
      {items.map(({ name, desc }) => (
        <pre key={name}>
          <i style={{ fontWeight: 600 }}>{`${name}.`}</i> {desc}
        </pre>
      ))}
    </div>
  ) : (
    <Fragment />
  )
}

export default BaseCombo
