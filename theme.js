// npm
import { tosh as theme } from "@theme-ui/presets"

const oy = [
  "base",
  "dark",
  "deep",
  "funk",
  "future",
  "roboto",
  "swiss",
  "system",
  "tosh",
  "bootstrap",
  "bulma",
  "tailwind",
]

// const theme = themes.tosh // swiss

if (!theme.breakpoints) theme.breakpoints = ["40em", "56em", "64em"]

if (!theme.styles.header) theme.styles.header = {}
theme.styles.header.display = "block"

export default theme
