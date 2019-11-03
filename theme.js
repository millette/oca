// npm
import { tosh as theme } from "@theme-ui/presets"

// Available themes
// "base", "dark", "deep", "funk", "future", "roboto"
// "swiss", "system", "bootstrap", "bulma", "tailwind"

if (!theme.breakpoints) theme.breakpoints = ["40em", "56em", "64em"]

if (!theme.styles.header) theme.styles.header = {}
theme.styles.header.display = "block"

export default theme
