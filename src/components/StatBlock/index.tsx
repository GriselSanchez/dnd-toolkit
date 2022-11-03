import React from 'react'

import { MONSTER, STAT } from '../../constants'
import { useGetMonsterBySlug } from '../../hooks'
import { MonsterPreview } from '../../types'
import {
  CardBody,
  CardDivider,
  CardHeader,
  CardInfo,
  CardStat,
  CardStatContainer,
  CardSubtitle,
  CardTitle,
  ChallengeContainer,
} from '../5eCard'
import { StyledCardContainer, BaseCombo } from './components'

interface Props {
  selectedMonster?: MonsterPreview
}

const StatBlock = ({ selectedMonster }: Props) => {
  const { formattedMonster: monster } = useGetMonsterBySlug(selectedMonster?.slug)

  const {
    name,
    size,
    type,
    alignment,
    armor_class,
    armor_desc,
    hit_points,
    hit_dice,
    speed,
    challenge_rating,
    skills,
    saving_throws,
    damage_vulnerabilities,
    damage_resistances,
    damage_immunities,
    condition_immunities,
    senses,
    languages,
    special_abilities,
    actions,
    reactions,
    legendary_actions,
    legendary_desc,
  } = { ...monster }

  return (
    <StyledCardContainer>
      <CardHeader />
      {monster && (
        <CardBody>
          <CardTitle name={name} />
          <CardSubtitle size={size} type={type} alignment={alignment} />
          <CardDivider />
          <CardInfo label='Armor Class' value={`${armor_class} ${armor_desc ? `(${armor_desc})` : ''}`} />
          <CardInfo label='Hit Points' value={`${hit_points} (${hit_dice})`} />
          <CardInfo label='Speed' value={speed} />
          <CardDivider />
          <CardStatContainer>
            {STAT.NAMES.map(name => (
              <CardStat key={`${name}-${name}`} name={name} monster={monster} />
            ))}
          </CardStatContainer>
          <CardDivider />
          <CardInfo label='Skills' value={skills} />
          <CardInfo label='Saving Throws' value={saving_throws} />
          <CardInfo label='Damage Vulnerabilities' value={damage_vulnerabilities} />
          <CardInfo label='Damage Resistances' value={damage_resistances} />
          <CardInfo label='Damage Immunities' value={damage_immunities} />
          <CardInfo label='Condition Immunities' value={condition_immunities} />
          <CardInfo label='Senses' value={senses} />
          <CardInfo label='Languages' value={languages} />
          <ChallengeContainer>
            <CardInfo
              label='Challenge'
              value={`${challenge_rating} (${MONSTER.CHALLENGE_RATINGS[challenge_rating].xp} XP)`}
            />
            <CardInfo label='Proficiency Bonus' value={`+ ${MONSTER.CHALLENGE_RATINGS[challenge_rating].prof}`} />
          </ChallengeContainer>
          <CardDivider />
          <BaseCombo items={special_abilities} />
          <BaseCombo title='Actions' items={actions} />
          <BaseCombo title='Reactions' items={reactions} />
          <BaseCombo title='Legendary Actions' items={legendary_actions} description={legendary_desc} />
        </CardBody>
      )}
      <CardHeader />
    </StyledCardContainer>
  )
}

export default StatBlock
