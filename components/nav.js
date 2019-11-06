/** @jsx jsx */

// npm
import { jsx, Flex, Box } from "theme-ui"

// self
import NavLink from "./nav-link"

const Nav = () => {
  return (
    <Flex sx={{ alignItems: "center" }}>
      <NavLink href="/">Frontpage</NavLink>
      <NavLink href="/search">Search</NavLink>
      <NavLink href="/tags">Browse</NavLink>
      <Box sx={{ mx: "auto" }}></Box>
      <NavLink href="/readme">Readme</NavLink>
      <NavLink href="/credits">Credits</NavLink>
      <NavLink href="/about">About</NavLink>
    </Flex>
  )
}

export default Nav
