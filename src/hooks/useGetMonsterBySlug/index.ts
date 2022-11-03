import { useMemo } from 'react'
import { useQuery } from 'react-query'

import { MonsterApi } from '../../api'
import { QUERY_KEYS } from '../../constants'
import { formatSavingThrows, formatSkills, formatSpeed } from './utils'

const useGetMonsterBySlug = (slug?: string) => {
  const { data } = useQuery([QUERY_KEYS.MONSTER, slug], () => MonsterApi.getBySlug(slug), {
    enabled: !!slug,
  })

  const formattedMonster = useMemo(
    () =>
      data && {
        ...data,
        speed: formatSpeed(data.speed),
        skills: formatSkills(data.skills),
        saving_throws: formatSavingThrows(data),
      },
    [data],
  )

  return {
    monster: data,
    formattedMonster,
  }
}

export { useGetMonsterBySlug }
