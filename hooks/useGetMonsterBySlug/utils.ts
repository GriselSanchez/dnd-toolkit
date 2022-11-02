import { STAT } from "../../constants";
import { IMonster, ISkills, ISpeed } from "../../types";
import { StringUtils } from "../../utils";

const formatSpeed = (speed: ISpeed) => {
  const speedToArray = Object.entries(speed).map(([key, value]) => {
    if (key === "hover") return;

    const hoverProp =
      speed.hasOwnProperty("hover") && key === "fly" && speed.hover
        ? "(hover)"
        : "";

    return `${
      speed.hasOwnProperty(key)
        ? `${StringUtils.formatToUpperFirstLetter(key)} ${value}ft.`
        : ""
    } ${hoverProp}`;
  });

  return speedToArray.join(" ");
};

const formatSkills = (skills: ISkills) => {
  return (
    skills &&
    Object.entries(skills)
      .map(
        ([key, value]) =>
          `${StringUtils.formatToUpperFirstLetter(key)} +${value}`
      )
      .join(", ")
  );
};

const formatSavingThrows = (monster: IMonster) => {
  return STAT.NAMES.map((name) => {
    const value = monster[`${name}_save`];
    const label = StringUtils.formatToUpperFirstLetter(name).slice(0, 3);
    return value ? `${label} +${value}` : "";
  })
    .filter((value) => value !== "")
    .join(", ");
};

export { formatSavingThrows, formatSkills, formatSpeed };
