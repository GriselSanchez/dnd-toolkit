import React, { useState } from "react";

import { Search, StatBlock } from "../components";
import { useGetMonsterBySlug } from "../hooks";
import { MonsterPreview } from "../types";

export default function Monster() {
  const [selectedMonster, setSelectedMonster] = useState<MonsterPreview>();
  const { monster } = useGetMonsterBySlug(selectedMonster?.slug);

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
        <Search
          selectedMonster={selectedMonster}
          setSelectedMonster={setSelectedMonster}
        />
        <StatBlock monster={monster} />
      </main>
    </div>
  );
}
