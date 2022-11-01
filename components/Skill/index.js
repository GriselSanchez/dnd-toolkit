import React from "react";

// TODO: get with formula
const modifiers = [
  "-5",
  "-4",
  "-4",
  "-3",
  "-3",
  "-2",
  "-2",
  "-1",
  "-1",
  "0",
  "0",
  "+1",
  "+1",
  "+2",
  "+2",
  "+3",
  "+3",
  "+4",
  "+4",
  "+5",
  "+5",
  "+6",
  "+6",
  "+7",
  "+7",
  "+8",
  "+8",
  "+9",
  "+9",
  "+10",
];

const Skill = ({ label, value }) => {
  const modifier = modifiers[value - 1];
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
