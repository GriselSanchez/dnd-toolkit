import { FC, PropsWithChildren } from "react";

import { styled } from "../../../stitches.config";

const Container = styled("div", {
  background: "url(https://i.imgur.com/wAhINL9.jpg)",
  cursor: "pointer",
});

const CardContainer: FC<PropsWithChildren> = ({ children }) => (
  <Container>{children}</Container>
);

export default CardContainer;
