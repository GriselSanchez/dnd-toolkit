import { useEffect, useState } from "react";

import { Skill } from "../components";
import { CHALLENGE_RATINGS } from "../constants";
import useGetAllMonsters from "../hooks/useGetAllMonsters";
import useGetMonsterBySlug from "../hooks/useGetMonsterBySlug";
import { MonsterPreview } from "../types";

export default function Monster() {
  const [selectedMonster, setSelectedMonster] = useState<MonsterPreview>();
  const [filters, setFilters] = useState<{ name: string }>({ name: "" });

  const { results, count } = useGetAllMonsters(filters);
  const { monster } = useGetMonsterBySlug(
    selectedMonster?.slug ?? (results.length > 0 && results[0].slug)
  );

  // TODO: get random in filtered data
  const generateRandomIndex = () => {
    if (count) {
      return Math.floor(Math.random() * count) + 1;
    }
  };

  const getRandomMonster = async () => {
    const index = generateRandomIndex();
    const newSelectedMonster = results[index];
    setSelectedMonster(newSelectedMonster);
  };

  return (
    <div>
      <main
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          backgroundColor: "#F4F3F1",
          gap: 50,
        }}
      >
        <div>
          <p>Start with an existing monster</p>
          <input
            placeholder="Name"
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <input
            placeholder="CR"
            // onChange={async (e) => await getMonsterByCR(e.target.value)}
          />
          {/* <button
            onClick={() => {
              console.log(monsterName);
              setMonsters([
                ...monsters.filter((monster) =>
                  monster.name.includes(monsterName)
                ),
              ]);
            }}
          >
            Search
          </button> */}
          <select
            placeholder="Type"
            // onChange={async (e) => await getMonsterByType(e.target.value)}
          >
            {[
              "aberration",
              "beast",
              "celestial",
              "construct",
              "dragon",
              "elemental",
              "fey",
              "fiend",
              "giant",
              "humanoid",
              "monstrosity",
              "ooze",
              "plant",
              "undead",
            ].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <button onClick={() => getRandomMonster()}>Random</button>
          <div style={{ maxHeight: "90vh", overflowY: "auto" }}>
            {results.map((monster) => (
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
                      CHALLENGE_RATINGS[monster.challenge_rating].xp
                    } XP)`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
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
                    {/* {`${
                      monster.speed.walk ? `Walk ${monster.speed.walk}ft.` : ""
                    } ${
                      monster.speed.fly ? `Fly ${monster.speed.fly}ft.` : ""
                    } ${monster.speed.hover ? "(hover)" : ""}
              ${monster.speed.swim ? `Swim ${monster.speed.swim}ft.` : ""} ${
                      monster.speed.climb
                        ? `Climb ${monster.speed.climb}ft.`
                        : ""
                    } ${
                      monster.speed.burrow
                        ? `Burrow ${monster.speed.burrow}ft.`
                        : ""
                    } 
              `} */}
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
                            CHALLENGE_RATINGS[monster.challenge_rating].xp
                          } XP)`}
                        </p>
                      </div>
                      <div>
                        <p>
                          <b>Proficiency Bonus </b>
                          {`+ ${
                            CHALLENGE_RATINGS[monster.challenge_rating].prof
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
      </main>
    </div>
  );
}
