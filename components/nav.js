/** @jsx jsx */

// npm
import { jsx, Flex, Box } from "theme-ui"

// self
import NavLink from "./nav-link"

const Nav = () => {
  return (
    <Flex sx={{ alignItems: "center" }}>
      <NavLink href="/">Front</NavLink>
      <NavLink href="/tags">Tags</NavLink>
      <Box sx={{ mx: "auto" }}></Box>
      <NavLink href="/readme">Readme</NavLink>
      <NavLink href="/about">About</NavLink>
    </Flex>
  )
}

export default Nav
