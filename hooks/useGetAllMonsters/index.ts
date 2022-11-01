import { data } from "cypress/types/jquery";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "../../constants";
import { IGetAllMonstersFilters, MonsterPreview } from "../../types";
import { StringUtils } from "../../utils/string";

interface IGetAllMonstersResponse {
  count: number;
  results: MonsterPreview[];
}

const getAllMonsters = async (
  filters: IGetAllMonstersFilters
): Promise<IGetAllMonstersResponse> => {
  const formattedFilters =
    StringUtils.getQueryParamsFromObject<IGetAllMonstersFilters>(filters);
  // TODO: get fields from type
  const response = await fetch(
    `https://api.open5e.com/monsters/?fields=slug,name,challenge_rating,type,size,hit_points,alignment,armor_class,armor_desc,hit_dice&limit=2000&ordering=slug&${formattedFilters}`
  );
  const data = await response.json();
  return data;
};

interface Props {
  filters?: IGetAllMonstersFilters;
}

const useGetAllMonsters = ({ filters }: Props) => {
  const { name, ...serverFilters } = { ...filters };
  const { data } = useQuery([QUERY_KEYS.MONSTERS, serverFilters], () =>
    getAllMonsters(serverFilters)
  );

  // Overrides API name filter because is case sensitive
  const filteredResults = data?.results.filter(
    (result) => !name || result.name.toLowerCase().includes(name.toLowerCase())
  );

  return { results: filteredResults ?? [], count: data?.count ?? 0 };
};

export { useGetAllMonsters };
