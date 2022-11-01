import React from "react";

import { styled } from "../../../stitches.config";
import { IMonster } from "../../../types";

const Subtitle = styled("i", {
  fontFamily: "$body",
  fontSize: "$3",
  fontWeight: 400,
  margin: "5px 0",
});

const CardSubtitle = ({
  size,
  type,
  alignment,
}: Pick<IMonster, "size" | "type" | "alignment">) => (
  <Subtitle>{`${size} ${type}, ${alignment}`}</Subtitle>
);

export default CardSubtitle;
