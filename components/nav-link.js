/** @jsx jsx */

// npm
import Link from "next/link"
import { useRouter } from "next/router"
import { jsx, Styled, Box } from "theme-ui"

const NavLink = ({ href, children }) => {
  const { pathname } = useRouter()
  return (
    <Box sx={{ p: 2, fontWeight: pathname === href ? 700 : undefined }}>
      <Link passHref href={href}>
        <Styled.a>{children}</Styled.a>
      </Link>
    </Box>
  )
}

export default NavLink
