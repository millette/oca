/** @jsx jsx */

// npm
import { jsx, Styled } from "theme-ui"

const Deps = (props) => (
  <>
    <Styled.pre>{JSON.stringify(props, null, 2)}</Styled.pre>
  </>
)

export default Deps
