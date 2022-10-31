import Skill from "@components/Skill";
import { useEffect, useState } from "react";

const cr = {
  0: {
    xp: "10",
    prof: 2,
  },
  "1/8": {
    xp: "25",
    prof: 2,
  },
  "1/4": {
    xp: "50",
    prof: 2,
  },
  "1/2": {
    xp: "100",
    prof: 2,
  },
  1: {
    xp: "200",
    prof: 2,
  },
  2: {
    xp: "450",
    prof: 2,
  },
  3: {
    xp: "700",
    prof: 2,
  },
  4: {
    xp: "1,100",
    prof: 2,
  },
  5: {
    xp: "1,800",
    prof: 3,
  },
  6: {
    xp: "2,300",
    prof: 3,
  },
  7: {
    xp: "2,900",
    prof: 3,
  },
  8: {
    xp: "3,900",
    prof: 3,
  },
  9: {
    xp: "5,000",
    prof: 4,
  },
  10: {
    xp: "5,900",
    prof: 4,
  },
  11: {
    xp: "7,200",
    prof: 4,
  },
  12: {
    xp: "8,400",
    prof: 4,
  },
  13: {
    xp: "10,000",
    prof: 5,
  },
  14: {
    xp: "11,500",
    prof: 5,
  },
  15: {
    xp: "13,000",
    prof: 5,
  },
  16: {
    xp: "15,000",
    prof: 5,
  },
  17: {
    xp: "18,000",
    prof: 6,
  },
  18: {
    xp: "20,000",
    prof: 6,
  },
  19: {
    xp: "22,000",
    prof: 6,
  },
  20: {
    xp: "25,000",
    prof: 6,
  },
  21: {
    xp: "33,000",
    prof: 7,
  },
  22: {
    xp: "41,000",
    prof: 7,
  },
  23: {
    xp: "50,000",
    prof: 7,
  },
  24: {
    xp: "62,000",
    prof: 7,
  },
  25: {
    xp: "75,000",
    prof: 8,
  },
  26: {
    xp: "90,000",
    prof: 8,
  },
  27: {
    xp: "105,000",
    prof: 8,
  },
  28: {
    xp: "120,000",
    prof: 8,
  },
  29: {
    xp: "135,000",
    prof: 9,
  },
  30: {
    xp: "155,000",
    prof: 9,
  },
};

export default function Monster() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState();
  const [selectedMonster, setSelectedMonster] = useState();
  const [monsters, setMonsters] = useState([]);

  // const [monsterName, setMonsterName] = useState("");

  const getMonsters = async (page = 1, size = 10) => {
    const res = await fetch(
      `https://api.open5e.com/monsters?page=${page}&limit=${size}`
    );
    const monstersData = await res.json();

    if (monstersData.count && monstersData.results) {
      setTotalCount(monstersData.count);
      setMonsters(monstersData.results);
    }

    return monstersData;
  };

  const getMonsterByCR = async (cr) => {
    if (!cr) return;
    const res = await fetch(
      `https://api.open5e.com/monsters?challenge_rating=${cr}`
    );
    const monstersData = await res.json();
    setMonsters(monstersData.results);
    return monstersData;
  };

  const getMonsterByName = async (name) => {
    if (!name) return;
    const res = await fetch(`https://api.open5e.com/monsters?name=${name}`);
    const monstersData = await res.json();
    setMonsters(monstersData.results);
    return monstersData;
  };

  const getMonsterByType = async (type) => {
    if (!type) return;
    const res = await fetch(`https://api.open5e.com/monsters?type=${type}`);
    const monstersData = await res.json();
    setMonsters(monstersData.results);
    return monstersData;
  };

  useEffect(() => {
    getMonsters(currentPage).catch((err) => console.log(err));
  }, []);

  const generateRandomPageNumber = () => {
    if (totalCount) {
      return Math.floor(Math.random() * totalCount) + 1;
    }
  };

  const getRandomMonster = async () => {
    const page = generateRandomPageNumber();
    const monsters = await getMonsters(page || 1, 1);
    if (monsters && monsters.results) {
      const newSelectedMonster =
        monsters.results.length > 0 ? monsters.results[0] : undefined;
      setSelectedMonster(newSelectedMonster);
    }
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
            onChange={async (e) => await getMonsterByName(e.target.value)}
          />
          <input
            placeholder="CR"
            onChange={async (e) => await getMonsterByCR(e.target.value)}
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
            onChange={async (e) => await getMonsterByType(e.target.value)}
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
              <option value={type}>{type}</option>
            ))}
          </select>
          <button onClick={async () => await getRandomMonster()}>Random</button>
          <div style={{ maxHeight: "90vh", overflowY: "auto" }}>
            {monsters &&
              monsters.map((monster) => (
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
                    <svg height="5" width="100%" class="tapered-rule">
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
                        cr[monster.challenge_rating].xp
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
            {selectedMonster && (
              <div
                className="custom-cursor"
                style={{
                  columnCount: 2,
                  columnGap: 25,
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
                  {selectedMonster.name}
                </h1>
                <p
                  style={{
                    fontStyle: "italic",
                    marginTop: 0,
                    textTransform: "capitalize",
                    fontSize: 13,
                  }}
                >{`${selectedMonster.size} ${selectedMonster.type}, ${selectedMonster.alignment}`}</p>
                <svg height="5" width="100%" class="tapered-rule">
                  <polyline points="0,0 400,2.5 0,5"></polyline>
                </svg>
                <div style={{ color: "#822000" }}>
                  <p>
                    <b>Armor Class </b>
                    {`${selectedMonster.armor_class} ${
                      selectedMonster.armor_desc
                        ? `(${selectedMonster.armor_desc})`
                        : ""
                    }`}
                  </p>
                  <p>
                    <b>Hit Points </b>
                    {`${selectedMonster.hit_points} (${selectedMonster.hit_dice})`}
                  </p>
                  <p>
                    <b>Speed </b>
                    {`${
                      selectedMonster.speed.walk
                        ? `Walk ${selectedMonster.speed.walk}ft.`
                        : ""
                    } ${
                      selectedMonster.speed.fly
                        ? `Fly ${selectedMonster.speed.fly}ft.`
                        : ""
                    } ${selectedMonster.speed.hover ? "(hover)" : ""}
              ${
                selectedMonster.speed.swim
                  ? `Swim ${selectedMonster.speed.swim}ft.`
                  : ""
              } ${
                      selectedMonster.speed.climb
                        ? `Climb ${selectedMonster.speed.climb}ft.`
                        : ""
                    } ${
                      selectedMonster.speed.burrow
                        ? `Burrow ${selectedMonster.speed.burrow}ft.`
                        : ""
                    } 
              `}
                  </p>
                  <svg height="5" width="100%" class="tapered-rule">
                    <polyline points="0,0 400,2.5 0,5"></polyline>
                  </svg>
                  <div
                    style={{
                      display: "flex",
                      gap: 20,
                      justifyContent: "center",
                    }}
                  >
                    <Skill label="STR" value={selectedMonster.strength} />
                    <Skill label="DEX" value={selectedMonster.dexterity} />
                    <Skill label="CON" value={selectedMonster.constitution} />
                    <Skill label="INT" value={selectedMonster.intelligence} />
                    <Skill label="WIS" value={selectedMonster.wisdom} />
                    <Skill label="CHA" value={selectedMonster.charisma} />
                  </div>
                  <svg height="5" width="100%" class="tapered-rule">
                    <polyline points="0,0 400,2.5 0,5"></polyline>
                  </svg>
                  <div>
                    <p>
                      <b>Skills </b>
                      {Object.entries(selectedMonster.skills)
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
                        { label: "Str", value: selectedMonster.strength_save },
                        { label: "Dex", value: selectedMonster.dexterity_save },
                        {
                          label: "Con",
                          value: selectedMonster.constitution_save,
                        },
                        {
                          label: "Int",
                          value: selectedMonster.intelligence_save,
                        },
                        { label: "Wis", value: selectedMonster.wisdom_save },
                        { label: "Cha", value: selectedMonster.charisma_save },
                      ]
                        .map(({ label, value }) =>
                          value ? `${label} +${value}` : ""
                        )
                        .filter((value) => value !== "")
                        .join(", ")}
                    </p>
                    <p>
                      <b>Damage Vulnerabilities </b>
                      {selectedMonster.damage_vulnerabilities}
                    </p>
                    <p>
                      <b>Damage Resistances </b>
                      {selectedMonster.damage_resistances}
                    </p>
                    <p>
                      <b>Damage Immunities </b>
                      {selectedMonster.damage_immunities}
                    </p>
                    <p>
                      <b>Condition Immunities </b>
                      {selectedMonster.condition_immunities}
                    </p>
                    <p>
                      <b>Senses </b>
                      {selectedMonster.senses}
                    </p>
                    <p>
                      <b>Languages </b>
                      {selectedMonster.languages}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <p>
                          <b>Challenge </b>
                          {`${selectedMonster.challenge_rating} (${
                            cr[selectedMonster.challenge_rating].xp
                          } XP)`}
                        </p>
                      </div>
                      <div>
                        <p>
                          <b>Proficiency Bonus </b>
                          {`+ ${cr[selectedMonster.challenge_rating].prof}`}
                        </p>
                      </div>
                    </div>
                  </div>
                  <svg height="5" width="100%" class="tapered-rule">
                    <polyline points="0,0 400,2.5 0,5"></polyline>
                  </svg>
                </div>
                <div>
                  {selectedMonster.special_abilities &&
                    selectedMonster.special_abilities.map((ability) => (
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
                  {selectedMonster.actions &&
                    selectedMonster.actions.map((action) => (
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
                  {selectedMonster.reactions &&
                    selectedMonster.reactions.map((reaction) => (
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
                    {selectedMonster.legendary_desc}
                  </p>
                  {selectedMonster.legendary_actions &&
                    selectedMonster.legendary_actions.map((action) => (
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
