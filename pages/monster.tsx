import React, { useState } from "react";

import { Search, StatBlock } from "../components";
import { MonsterPreview } from "../types";

export default function Monster() {
  const [selectedMonster, setSelectedMonster] = useState<MonsterPreview>();

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
        <StatBlock selectedMonster={selectedMonster} />
      </main>
    </div>
  );
}
