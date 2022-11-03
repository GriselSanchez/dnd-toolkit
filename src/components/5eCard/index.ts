import { styled } from '../../../stitches.config'

export const CardStatContainer = styled('div', {
  display: 'flex',
  gap: 20,
  justifyContent: 'center',
})

export const ChallengeContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  width: '95%',
})

export const CardHeader = styled('div', {
  background: '$secondary',
  backgroundImage:
    'linear-gradient(45deg,#bd9b4c 25%,#b38720 25%,#b38720 50%,#bd9b4c 50%,#bd9b4c 75%,#b38720 75%,#b38720 100%)',
  backgroundSize: '5px 5px',
  border: '1px solid black',
  borderLeft: 0,
  borderRight: 0,
  height: '0.5em',
  width: '100%',
})

export { default as CardStat } from './CardStat'
export { default as CardTitle } from './CardTitle'
export { default as CardSubtitle } from './CardSubtitle'
export { default as CardContainer } from './CardContainer'
export { default as CardBody } from './CardBody'
export { default as CardDivider } from './CardDivider'
export { default as CardInfo } from './CardInfo'
