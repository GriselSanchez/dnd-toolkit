import React from "react";

import { MONSTER } from "../../constants";
import { IMonster } from "../../types";
import { Skill } from "./components";

interface Props {
  monster?: IMonster;
}

const StatBlock = ({ monster }: Props) => {
  return (
    <div
      style={{
        width: "75vw",
        boxShadow: "0 0 5px #979aa4",
        background: "url(https://i.imgur.com/wAhINL9.jpg)",
      }}
    >
      <div className="header" />
      <div style={{ padding: "15px" }}>
        {monster && (
          <div
            className="custom-cursor"
            style={{
              columnCount: 2,
            }}
          >
            <h1
              style={{
                margin: 0,
                color: "#822000",
                fontFamily: "Cinzel",
                fontWeight: 700,
                fontVariant: "small-caps",
                fontSize: 28,
              }}
            >
              {monster.name}
            </h1>
            <p
              style={{
                fontStyle: "italic",
                marginTop: 0,
                textTransform: "capitalize",
                fontSize: 13,
              }}
            >{`${monster.size} ${monster.type}, ${monster.alignment}`}</p>
            <svg height="8" width="100%" className="tapered-rule">
              <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
            <div style={{ color: "#822000" }}>
              <p>
                <b>Armor Class </b>
                {`${monster.armor_class} ${
                  monster.armor_desc ? `(${monster.armor_desc})` : ""
                }`}
              </p>
              <p>
                <b>Hit Points </b>
                {`${monster.hit_points} (${monster.hit_dice})`}
              </p>
              <p>
                <b>Speed </b>
                {Object.entries(monster.speed).map(([key, value]) => {
                  const hoverProp =
                    monster.speed.hasOwnProperty("hover") &&
                    key === "swim" &&
                    monster.speed.hover
                      ? "(hover)"
                      : "";
                  return `${
                    monster.speed.hasOwnProperty(key)
                      ? `${key.charAt(0).toUpperCase()}${key.slice(
                          1
                        )} ${value}ft.`
                      : ""
                  }
                  ${hoverProp}
                `;
                })}
              </p>
              <svg height="8" width="100%" className="tapered-rule">
                <polyline points="0,0 400,2.5 0,5"></polyline>
              </svg>
              <div
                style={{
                  display: "flex",
                  gap: 20,
                  justifyContent: "center",
                }}
              >
                <Skill label="STR" value={monster.strength} />
                <Skill label="DEX" value={monster.dexterity} />
                <Skill label="CON" value={monster.constitution} />
                <Skill label="INT" value={monster.intelligence} />
                <Skill label="WIS" value={monster.wisdom} />
                <Skill label="CHA" value={monster.charisma} />
              </div>
              <svg height="8" width="100%" className="tapered-rule">
                <polyline points="0,0 400,2.5 0,5"></polyline>
              </svg>
              <div>
                <p>
                  <b>Skills </b>
                  {monster.skills &&
                    Object.entries(monster.skills)
                      .map(([key, value]) => {
                        return `${key.charAt(0).toUpperCase()}${key.slice(
                          1
                        )} +${value}`;
                      })
                      .join(", ")}
                </p>
                <p>
                  <b>Saving Throws </b>
                  {[
                    { label: "Str", value: monster.strength_save },
                    { label: "Dex", value: monster.dexterity_save },
                    {
                      label: "Con",
                      value: monster.constitution_save,
                    },
                    {
                      label: "Int",
                      value: monster.intelligence_save,
                    },
                    { label: "Wis", value: monster.wisdom_save },
                    { label: "Cha", value: monster.charisma_save },
                  ]
                    .map(({ label, value }) =>
                      value ? `${label} +${value}` : ""
                    )
                    .filter((value) => value !== "")
                    .join(", ")}
                </p>
                <p>
                  <b>Damage Vulnerabilities </b>
                  {monster.damage_vulnerabilities}
                </p>
                <p>
                  <b>Damage Resistances </b>
                  {monster.damage_resistances}
                </p>
                <p>
                  <b>Damage Immunities </b>
                  {monster.damage_immunities}
                </p>
                <p>
                  <b>Condition Immunities </b>
                  {monster.condition_immunities}
                </p>
                <p>
                  <b>Senses </b>
                  {monster.senses}
                </p>
                <p>
                  <b>Languages </b>
                  {monster.languages}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "95%",
                  }}
                >
                  <div>
                    <p>
                      <b>Challenge </b>
                      {`${monster.challenge_rating} (${
                        MONSTER.CHALLENGE_RATINGS[monster.challenge_rating].xp
                      } XP)`}
                    </p>
                  </div>
                  <div>
                    <p>
                      <b>Proficiency Bonus </b>
                      {`+ ${
                        MONSTER.CHALLENGE_RATINGS[monster.challenge_rating].prof
                      }`}
                    </p>
                  </div>
                </div>
              </div>
              <svg height="8" width="100%" className="tapered-rule">
                <polyline points="0,0 400,2.5 0,5"></polyline>
              </svg>
            </div>
            <div>
              {monster.special_abilities &&
                monster.special_abilities.map((ability) => (
                  <pre>
                    <span style={{ fontWeight: 600, fontStyle: "italic" }}>
                      {`${ability.name}.`}
                    </span>{" "}
                    {ability.desc}
                  </pre>
                ))}
            </div>
            <div>
              <h3
                style={{
                  fontSize: 20,
                  paddingBottom: 5,
                  marginBottom: 15,
                  color: "#822000",
                  borderBottom: "1px solid #822000",
                }}
              >
                Actions
              </h3>
              {monster.actions &&
                monster.actions.map((action) => (
                  <pre>
                    <span style={{ fontWeight: 600, fontStyle: "italic" }}>
                      {`${action.name}.`}
                    </span>{" "}
                    {action.desc}
                  </pre>
                ))}
            </div>
            <div>
              <h3
                style={{
                  fontSize: 20,
                  paddingBottom: 5,
                  marginBottom: 15,
                  color: "#822000",
                  borderBottom: "1px solid #822000",
                }}
              >
                Reactions
              </h3>
              {monster.reactions &&
                monster.reactions.map((reaction) => (
                  <pre>
                    <span style={{ fontWeight: 600, fontStyle: "italic" }}>
                      {`${reaction.name}.`}
                    </span>{" "}
                    {reaction.desc}
                  </pre>
                ))}
            </div>
            <div>
              <h3
                style={{
                  fontSize: 20,
                  paddingBottom: 5,
                  marginBottom: 15,
                  color: "#822000",
                  borderBottom: "1px solid #822000",
                }}
              >
                Legendary Actions
              </h3>
              <p style={{ fontStyle: "italic", fontWeight: 300 }}>
                {monster.legendary_desc}
              </p>
              {monster.legendary_actions &&
                monster.legendary_actions.map((action) => (
                  <pre>
                    <span style={{ fontWeight: 600, fontStyle: "italic" }}>
                      {`${action.name}.`}
                    </span>{" "}
                    {action.desc}
                  </pre>
                ))}
            </div>
          </div>
        )}
      </div>
      <div className="header" />
    </div>
  );
};

export default StatBlock;
