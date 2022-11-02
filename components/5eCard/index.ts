import { styled } from "../../stitches.config";

export const CardStatContainer = styled("div", {
  display: "flex",
  gap: 20,
  justifyContent: "center",
});

export const ChallengeContainer = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  width: "95%",
});

export { default as CardStat } from "./CardStat";
export { default as CardHeader } from "./CardHeader";
export { default as CardTitle } from "./CardTitle";
export { default as CardSubtitle } from "./CardSubtitle";
export { default as CardContainer } from "./CardContainer";
export { default as CardBody } from "./CardBody";
export { default as CardDivider } from "./CardDivider";
export { default as CardInfo } from "./CardInfo";
