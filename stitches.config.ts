import { createStitches } from '@stitches/react'

export const { styled, getCssText } = createStitches({
  theme: {
    fonts: {
      title: 'Cinzel',
      body: 'Lora',
    },
    colors: {
      primary: '#822000',
      secondary: '#bd9b4c',
      backgroundLight: '#F4F3F1',
    },
    fontSizes: {
      1: '28px',
      2: '22px',
      3: '14px',
      0: '12px',
    },
    space: {
      s1: '1rem',
      s2: '1.5rem',
      s3: '2rem',
    },
  },
})
