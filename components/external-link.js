/** @jsx jsx */

//npm
import { jsx, Styled } from "theme-ui"

export default ({ children, href }) => (
  <Styled.a target="_blank" rel="noopener noreferrer" href={href}>
    {children}
  </Styled.a>
)
