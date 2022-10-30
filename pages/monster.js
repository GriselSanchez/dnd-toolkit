import Skill from "@components/Skill";
import { useEffect, useState } from "react";

// TODO: get with formula
const challenge_xp = [
  200, 450, 700, 1100, 1800, 2300, 2900, 3900, 5000, 5900, 7200, 8400, 10000,
  11500, 13000, 15000, 18000, 20000, 22000, 25000, 33000, 41000, 50000, 62000,
  75000, 90000, 105000, 120000, 135000, 155000,
];

export default function Monster() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState();
  const [selectedMonster, setSelectedMonster] = useState();
  const [monsters, setMonsters] = useState([]);

  const [monsterName, setMonsterName] = useState("");

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
          gap: 50,
        }}
      >
        <div>
          <p>Start with an existing monster</p>
          <input
            placeholder="Name"
            // onChange={async (e) => await getMonsterByName(e.target.value)}
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
          {/* <select placeholder="Search by type"></select> */}
          <button onClick={async () => await getRandomMonster()}>Random</button>
          <div style={{ maxHeight: "100vh", overflowY: "auto" }}>
            {monsters &&
              monsters.map((monster) => (
                <div style={{ cursor: "pointer" }}>
                  <hr />
                  <div
                    onClick={() => {
                      setSelectedMonster(monster);
                    }}
                  >
                    <h3 style={{ marginBottom: 5, color: "#9a1515" }}>
                      {monster.name}
                    </h3>
                    <i>{` ${monster.size} ${monster.type}, ${monster.alignment}`}</i>
                    <p style={{ marginBottom: 0 }}>
                      <b style={{ color: "#9a1515" }}>Armor Class </b>
                      {monster.armor_class}
                    </p>
                    <p style={{ marginBottom: 0 }}>
                      <b style={{ color: "#9a1515" }}>Hit Points </b>
                      {`${monster.hit_points} (${monster.hit_dice})`}
                    </p>
                    <p style={{ marginBottom: 0 }}>
                      <b style={{ color: "#9a1515" }}>Challenge </b>
                      {`${monster.challenge_rating} (${
                        challenge_xp[monster.challenge_rating - 1]
                      } XP)`}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div style={{ width: "40vw" }}>
          {selectedMonster && (
            <div>
              <h1 style={{ marginBottom: 0, color: "#9a1515" }}>
                {selectedMonster.name}
              </h1>
              <p
                style={{ fontStyle: "italic", fontWeight: 300, marginTop: 5 }}
              >{`${selectedMonster.size} ${selectedMonster.type}, ${selectedMonster.alignment}`}</p>
              <hr />
              <div>
                <p>
                  <b>Armor Class </b>
                  {selectedMonster.armor_class}
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
              } `}
                </p>
                <hr />
                <div
                  style={{ display: "flex", gap: 20, justifyContent: "center" }}
                >
                  <Skill label="STR" value={selectedMonster.strength} />
                  <Skill label="DEX" value={selectedMonster.dexterity} />
                  <Skill label="CON" value={selectedMonster.constitution} />
                  <Skill label="INT" value={selectedMonster.intelligence} />
                  <Skill label="WIS" value={selectedMonster.wisdom} />
                  <Skill label="CHA" value={selectedMonster.charisma} />
                </div>
                <hr />
                <div>
                  <p>
                    <b>Saving Throws </b>?
                  </p>
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
                  <p>
                    <b>Challenge </b>
                    {`${selectedMonster.challenge_rating} (${
                      challenge_xp[selectedMonster.challenge_rating - 1]
                    } XP)`}
                  </p>
                </div>
                <hr />
              </div>
              <div>
                {selectedMonster.special_abilities &&
                  selectedMonster.special_abilities.map((ability) => (
                    <div>
                      <b style={{ fontStyle: "italic" }}>{ability.name}</b>
                      <p>{ability.desc}</p>
                    </div>
                  ))}
              </div>
              <div>
                <h3
                  style={{
                    fontSize: 22,
                    marginBottom: 0,
                    color: "#9a1515",
                  }}
                >
                  Actions
                </h3>
                <hr />
                {selectedMonster.actions &&
                  selectedMonster.actions.map((action) => (
                    <div>
                      <b style={{ fontStyle: "italic" }}>{action.name}</b>
                      <p>{action.desc}</p>
                    </div>
                  ))}
              </div>
              <div>
                <h3
                  style={{
                    fontSize: 22,
                    marginBottom: 0,
                    color: "#9a1515",
                  }}
                >
                  Reactions
                </h3>
                <hr />
                {selectedMonster.reactions &&
                  selectedMonster.reactions.map((reaction) => (
                    <div>
                      <b style={{ fontStyle: "italic" }}>{reaction.name}</b>
                      <p>{reaction.desc}</p>
                    </div>
                  ))}
              </div>
              <div>
                <h3
                  style={{
                    fontSize: 22,
                    marginBottom: 0,
                    color: "#9a1515",
                  }}
                >
                  Legendary Actions
                </h3>
                <hr />
                <p style={{ fontStyle: "italic", fontWeight: 300 }}>
                  {selectedMonster.legendary_desc}
                </p>
                {selectedMonster.legendary_actions &&
                  selectedMonster.legendary_actions.map((action) => (
                    <div>
                      <b style={{ fontStyle: "italic" }}>{action.name}</b>
                      <p>{action.desc}</p>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
