import React, { FC, PropsWithChildren } from 'react'

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  columnCount?: number
}

const CardBody: FC<PropsWithChildren<Props>> = ({ columnCount = 2, children, ...props }) => {
  return (
    <div
      {...props}
      style={{
        padding: 15,
      }}
    >
      <div
        style={{
          columnCount,
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default CardBody
