import React from "react";

import { MONSTER } from "../../../../constants";
import { MonsterPreview } from "../../../../types";

interface Props {
  monster: MonsterPreview;
  setSelectedMonster: (monster: MonsterPreview) => void;
}

const MonsterCard = ({ monster, setSelectedMonster }: Props) => {
  return (
    <div
      style={{
        cursor: "pointer",
        background: "url(https://i.imgur.com/wAhINL9.jpg)",
      }}
    >
      <div className="header" />
      <div
        style={{ padding: 15 }}
        onClick={() => {
          setSelectedMonster(monster);
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#822000",
            fontFamily: "Cinzel",
            fontWeight: 700,
            fontVariant: "small-caps",
          }}
        >
          {monster.name}
        </h2>
        <i>{` ${monster.size} ${monster.type}, ${monster.alignment}`}</i>
        <svg height="8" width="100%" className="tapered-rule">
          <polyline points="0,0 400,2.5 0,5"></polyline>
        </svg>
        <p style={{ marginBottom: 0, color: "#822000" }}>
          <b>Armor Class </b>
          {`${monster.armor_class} ${
            monster.armor_desc ? `(${monster.armor_desc})` : ""
          }`}
        </p>
        <p style={{ marginBottom: 0, color: "#822000" }}>
          <b>Hit Points </b>
          {`${monster.hit_points} (${monster.hit_dice})`}
        </p>
        <p style={{ marginBottom: 0, color: "#822000" }}>
          <b>Challenge </b>
          {`${monster.challenge_rating} (${
            MONSTER.CHALLENGE_RATINGS[monster.challenge_rating].xp
          } XP)`}
        </p>
      </div>
    </div>
  );
};

export default MonsterCard;
