import React, { useEffect, useState } from 'react'

import { MonsterCard, MonsterCardsContainer } from './components'
import { MONSTER } from '../../constants'
import { useGetAllMonsters } from '../../hooks'
import { MonsterPreview, IGetAllMonstersFilters } from '../../types'
import { MathUtils, StringUtils } from '../../utils'

interface Props {
  selectedMonster: MonsterPreview
  setSelectedMonster: (monster: MonsterPreview) => void
}

const SearchBar = ({ selectedMonster, setSelectedMonster }: Props) => {
  const [filters, setFilters] = useState<IGetAllMonstersFilters>({})
  const { results, count } = useGetAllMonsters({ filters })

  useEffect(() => {
    if (!selectedMonster && results.length > 0) setSelectedMonster(results[0])
  }, [selectedMonster, setSelectedMonster, results])

  const getRandomMonster = () => {
    // TODO: get random in filtered data
    const index = MathUtils.generateRandomIndex(count)
    const newSelectedMonster = results[index]
    setSelectedMonster(newSelectedMonster)
  }

  const handleFilterChange = (name: string, value: string) => setFilters(prev => ({ ...prev, [name]: value }))

  return (
    <div>
      <p>Start with an existing monster</p>
      <input placeholder='Name' onChange={e => handleFilterChange('name', e.target.value)} />
      <select placeholder='CR' onChange={e => handleFilterChange('challenge_rating', e.target.value)}>
        {MONSTER.CHALLENGE_RATINGS_ORDERED.map(({ cr }) => (
          <option key={cr} value={cr}>
            {cr}
          </option>
        ))}
      </select>
      <select placeholder='Type' onChange={e => handleFilterChange('type', e.target.value)}>
        {MONSTER.TYPES.map(type => (
          <option key={type} value={type}>
            {StringUtils.formatToUpperFirstLetter(type)}
          </option>
        ))}
      </select>
      <button onClick={() => getRandomMonster()}>Random</button>
      <MonsterCardsContainer>
        {results.map(monster => (
          <MonsterCard key={monster.slug} monster={monster} setSelectedMonster={setSelectedMonster} />
        ))}
      </MonsterCardsContainer>
    </div>
  )
}

export default SearchBar
