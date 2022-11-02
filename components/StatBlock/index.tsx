import React from "react";

import { MONSTER, STAT } from "../../constants";
import { IMonster } from "../../types";
import { StringUtils } from "../../utils";
import {
  CardBody,
  CardDivider,
  CardHeader,
  CardInfo,
  CardStat,
  CardSubtitle,
  CardTitle,
} from "../5eCard";
import { StyledCardContainer } from "./components";

interface Props {
  monster?: IMonster;
}

const StatBlock = ({ monster }: Props) => {
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
    skills,
    damage_vulnerabilities,
    damage_resistances,
    damage_immunities,
    condition_immunities,
    senses,
    languages,
  } = { ...monster };

  return (
    <StyledCardContainer>
      <CardHeader />
      {monster && (
        <CardBody>
          <CardTitle name={name} />
          <CardSubtitle size={size} type={type} alignment={alignment} />
          <CardDivider />
          <div>
            <CardInfo
              label="Armor Class"
              value={`${armor_class} ${armor_desc ? `(${armor_desc})` : ""}`}
            />
            <CardInfo
              label="Hit Points"
              value={`${hit_points} (${hit_dice})`}
            />
            <CardInfo
              label="Speed"
              value={Object.entries(monster.speed)
                .map(([key, value]) => {
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
                })
                .join(" ")}
            />
            <CardDivider />
            <div
              style={{
                display: "flex",
                gap: 20,
                justifyContent: "center",
              }}
            >
              {STAT.NAMES.map((name) => (
                <CardStat
                  key={`${monster.name}-${name}`}
                  name={name}
                  monster={monster}
                />
              ))}
            </div>
            <CardDivider />
            <div>
              <CardInfo
                label="Skills"
                value={
                  skills &&
                  Object.entries(skills)
                    .map(
                      ([key, value]) =>
                        `${StringUtils.formatToUpperFirstLetter(key)} +${value}`
                    )
                    .join(", ")
                }
              />
              <CardInfo
                label="Saving Throws"
                value={STAT.NAMES.map((name) => {
                  const value = monster[`${name}_save`];
                  const label = StringUtils.formatToUpperFirstLetter(
                    name
                  ).slice(0, 3);
                  return value ? `${label} +${value}` : "";
                })
                  .filter((value) => value !== "")
                  .join(", ")}
              />
              <CardInfo
                label="Damage Vulnerabilities"
                value={damage_vulnerabilities}
              />
              <CardInfo label="Damage Resistances" value={damage_resistances} />
              <CardInfo label="Damage Immunities" value={damage_immunities} />
              <CardInfo
                label="Condition Immunities"
                value={condition_immunities}
              />
              <CardInfo label="Senses" value={senses} />
              <CardInfo label="Languages" value={languages} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "95%",
                }}
              >
                <CardInfo
                  label="Challenge"
                  value={`${challenge_rating} (${MONSTER.CHALLENGE_RATINGS[challenge_rating].xp} XP)`}
                />
                <CardInfo
                  label="Proficiency Bonus"
                  value={`+ ${MONSTER.CHALLENGE_RATINGS[challenge_rating].prof}`}
                />
              </div>
            </div>
            <CardDivider />
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
        </CardBody>
      )}
      <CardHeader />
    </StyledCardContainer>
  );
};

export default StatBlock;
