import React from "react";

import { Body } from "./components";
import { MONSTER } from "../../../../constants";
import { MonsterPreview } from "../../../../types";
import {
  CardContainer,
  CardDivider,
  CardHeader,
  CardInfo,
  CardSubtitle,
  CardTitle,
} from "../../../5eCard";

interface Props {
  monster: MonsterPreview;
  setSelectedMonster: (monster: MonsterPreview) => void;
}

const MonsterCard = ({ monster, setSelectedMonster }: Props) => {
  const {
    name,
    size,
    type,
    alignment,
    armor_class,
    armor_desc,
    hit_points,
    hit_dice,
    challenge_rating,
  } = monster;

  return (
    <CardContainer>
      <CardHeader />
      <Body onClick={() => setSelectedMonster(monster)}>
        <CardTitle name={name} />
        <CardSubtitle size={size} type={type} alignment={alignment} />
        <CardDivider />
        <CardInfo
          label="Armor Class"
          value={`${armor_class} ${armor_desc ? `(${armor_desc})` : ""}`}
        />
        <CardInfo label="Hit Points" value={`${hit_points} (${hit_dice})`} />
        <CardInfo
          label="Challenge"
          value={`${challenge_rating} (${MONSTER.CHALLENGE_RATINGS[challenge_rating].xp} XP)`}
        />
      </Body>
    </CardContainer>
  );
};

export default MonsterCard;
