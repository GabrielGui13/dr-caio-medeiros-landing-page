import { createCn } from "cn/config"

// Tokens de tipografia do design system (--text-* em globals.css).
// Sem isto o merge os confunde com cores de texto (text-label-lg vs text-on-primary).
export const FONT_SIZE_TOKENS = [
  "display",
  "display-mobile",
  "headline-lg",
  "headline-lg-mobile",
  "headline-md",
  "headline-md-mobile",
  "body-lg",
  "body-md",
  "body-sm",
  "label-lg",
  "label-md",
] as const

export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [{ text: [...FONT_SIZE_TOKENS] }],
      shadow: [{ shadow: ["ambient"] }],
    },
  },
})
