/** @jsx jsx */

/*
I was using the following until I noticed
the Styled.div could be used as wildcard

import { jsx, css } from "theme-ui"
const Summary = (props) => <summary {...props} css={css({ cursor: "pointer" })} />
*/

import { jsx, Styled } from "theme-ui"

const Summary = (props) => (
  <Styled.div as="summary" {...props} sx={{ mt: "1rem", cursor: "pointer" }} />
)

export default Summary
