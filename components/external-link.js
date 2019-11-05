/** @jsx jsx */

//npm
import { jsx, Styled } from "theme-ui"

export default ({ children, style, href }) => (
  <Styled.a style={style} target="_blank" rel="noopener noreferrer" href={href}>
    {children || href}
  </Styled.a>
)
