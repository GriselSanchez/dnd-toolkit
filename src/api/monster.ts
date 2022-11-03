import { IMonster, MonsterPreview } from '../types'
import { StringUtils } from '../utils'

export interface IGetAllFilters {
  name?: string
  challenge_rating?: string
  type?: string
}

interface IGetAllResponse {
  count: number
  results: MonsterPreview[]
}

const getAll = async (filters: IGetAllFilters): Promise<IGetAllResponse> => {
  const formattedFilters = StringUtils.getQueryParamsFromObject<IGetAllFilters>(filters)

  // TODO: get fields from type
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/monsters/?fields=slug,name,challenge_rating,type,size,hit_points,alignment,armor_class,armor_desc,hit_dice&limit=2000&ordering=slug&${formattedFilters}`,
  )
  const data = await response.json()

  return data
}

const getBySlug = async (slug: string): Promise<IMonster> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/monsters/${slug}`)
  const data = await response.json()

  return data
}

export const MonsterApi = {
  getAll,
  getBySlug,
}
