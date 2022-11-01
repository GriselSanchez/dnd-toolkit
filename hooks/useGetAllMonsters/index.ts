import { data } from "cypress/types/jquery";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "../../constants";
import { MonsterPreview } from "../../types";

interface Props {
  name: string;
}

const useGetAllMonsters = ({ name }: Props) => {
  const { data } = useQuery(QUERY_KEYS.MONSTERS, async () => {
    const response = await fetch(
      "https://api.open5e.com/monsters/?fields=slug,name,challenge_rating,type,size,hit_points,alignment,armor_class,armor_desc,hit_dice&limit=2000&ordering=slug"
    );
    const data = await response.json();
    return data as { count: number; results: MonsterPreview[] };
  });

  // Overrides API name filter because is case sensitive
  const filteredResults = data?.results.filter((result) =>
    result.name.toLowerCase().includes(name.toLowerCase())
  );

  return { results: filteredResults ?? [], count: data?.count ?? 0 };
};

export default useGetAllMonsters;
