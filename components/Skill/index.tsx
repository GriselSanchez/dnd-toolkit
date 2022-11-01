import React from "react";

import { MONSTER } from "../../constants";

const Skill = ({ label, value }) => {
  const modifier = MONSTER.STAT_MODIFIERS[value - 1];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 0,
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <b>{label}</b>
      <p style={{ marginTop: 5 }}>{`${value} (${modifier})`}</p>
    </div>
  );
};

export default Skill;
