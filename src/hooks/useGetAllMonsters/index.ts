import { useQuery } from 'react-query'

import { IGetAllFilters, MonsterApi } from '../../api/monster'
import { QUERY_KEYS } from '../../constants'

interface Props {
  filters?: IGetAllFilters
}

const useGetAllMonsters = ({ filters }: Props) => {
  const { name, ...serverFilters } = { ...filters }
  const { data } = useQuery([QUERY_KEYS.MONSTERS, serverFilters], () => MonsterApi.getAll(serverFilters))

  // Overrides API name filter because is case sensitive
  const filteredResults = data?.results.filter(
    result => !name || result.name.toLowerCase().includes(name.toLowerCase()),
  )

  return { results: filteredResults ?? [], count: data?.count ?? 0 }
}

export { useGetAllMonsters }
