import React, { FC, PropsWithChildren } from "react";

import { styled } from "../../../stitches.config";

export const Body = styled("div", {
  padding: 15,
});

const CardBody: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Body>
      <div
        style={{
          columnCount: 2,
        }}
      >
        {children}
      </div>
    </Body>
  );
};

export default CardBody;
