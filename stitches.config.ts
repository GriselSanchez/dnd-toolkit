import { createStitches } from "@stitches/react";

export const { styled, getCssText } = createStitches({
  theme: {
    fonts: {
      title: "Cinzel",
      body: "Lora",
    },
    colors: {
      primary: "#822000",
      secondary: "#bd9b4c",
    },
    fontSizes: {
      1: "28px",
      2: "24px",
      3: "14px",
    },
  },
});
