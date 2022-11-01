import { useQuery } from "react-query";
import { QUERY_KEYS } from "../../constants";
import { IMonster } from "../../types";

const useGetMonsterBySlug = (slug?: string) => {
  const { data } = useQuery(
    [QUERY_KEYS.MONSTER, slug],
    async () => {
      const response = await fetch(`https://api.open5e.com/monsters/${slug}`);
      const data = await response.json();
      return data as IMonster;
    },
    {
      enabled: !!slug,
    }
  );

  return {
    monster: data,
  };
};

export default useGetMonsterBySlug;
