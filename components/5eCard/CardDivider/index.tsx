import React from "react";

import { Divider } from "../../../assets";
import { styled } from "../../../stitches.config";

export const StyledDivider = styled(Divider, {
  fill: "$primary",
  width: "100%",
});

const CardDivider = () => <StyledDivider />;

export default CardDivider;
