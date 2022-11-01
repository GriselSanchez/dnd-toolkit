import { useQuery } from "react-query";

import { QUERY_KEYS } from "../../constants";
import { IMonster } from "../../types";

const getMonsterBySlug = async (slug: string): Promise<IMonster> => {
  const response = await fetch(`https://api.open5e.com/monsters/${slug}`);
  const data = await response.json();
  return data;
};

const useGetMonsterBySlug = (slug?: string) => {
  const { data } = useQuery(
    [QUERY_KEYS.MONSTER, slug],
    () => getMonsterBySlug(slug),
    {
      enabled: !!slug,
    }
  );

  return {
    monster: data,
  };
};

export { useGetMonsterBySlug };
