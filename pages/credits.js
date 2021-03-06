/** @jsx jsx */

// npm
import { jsx, Styled } from "theme-ui"
import fetcher from "../lib/fetcher"

// self
import CreditsMdx from "../components/credits.mdx"
import Dependencies from "../components/deps"
import Summary from "../components/summary"
import PageTitle from "../components/page-title"

const Credits = (props) => {
  if (props.error) return "Not good: " + props.error
  return (
    <>
      <PageTitle>Credits</PageTitle>
      <details open>
        <Summary>
          <Styled.h4>Dependencies</Styled.h4>
        </Summary>
        <Dependencies deps={props} />
      </details>
      <CreditsMdx />
    </>
  )
}

Credits.getInitialProps = async (o) => {
  const { dep, full } = o.query
  try {
    const res = await fetcher(
      `api/deps?full=${full || ""}&dep=${dep || ""}`,
      o.req
    )
    if (!res.ok) return { error: "Niet" }
    return res.json()
  } catch (e) {
    console.log("OUCH", e)
    return { error: e.message }
  }
}

export default Credits
