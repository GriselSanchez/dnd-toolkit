import React from "react";

import { styled } from "../../../stitches.config";

const Header = styled("div", {
  background: "$secondary",
  backgroundImage:
    "linear-gradient(45deg,#bd9b4c 25%,#b38720 25%,#b38720 50%,#bd9b4c 50%,#bd9b4c 75%,#b38720 75%,#b38720 100%)",
  backgroundSize: "5px 5px",
  border: "1px solid black",
  borderLeft: 0,
  borderRight: 0,
  height: "0.5em",
  width: "100%",
});

const CardHeader = () => <Header />;

export default CardHeader;
