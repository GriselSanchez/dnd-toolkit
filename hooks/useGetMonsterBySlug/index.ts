import { useMemo } from "react";
import { useQuery } from "react-query";

import { QUERY_KEYS } from "../../constants";
import { IMonster } from "../../types";
import { formatSavingThrows, formatSkills, formatSpeed } from "./utils";

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

  const formattedMonster = useMemo(
    () =>
      data && {
        ...data,
        speed: formatSpeed(data.speed),
        skills: formatSkills(data.skills),
        saving_throws: formatSavingThrows(data),
      },
    [data]
  );

  return {
    monster: data,
    formattedMonster,
  };
};

export { useGetMonsterBySlug };
