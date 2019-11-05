/** @jsx jsx */

// npm
import Head from "next/head"
import { jsx, Styled } from "theme-ui"
import fetcher from "../lib/fetcher"

// self
import CreditsMdx from "../components/credits.mdx"
import Dependencies from "../components/deps"
import Summary from "../components/summary"

const Credits = (props) => {
  return (
    <>
      <Head>
        <title>Credits - OpenClipArts Explorer</title>
      </Head>

      <CreditsMdx />
      <details open>
        <Summary>
          <Styled.h4>Dependencies</Styled.h4>
        </Summary>
        <Dependencies deps={props} />
      </details>
    </>
  )
}

Credits.getInitialProps = async (o) => {
  const { dep } = o.query
  try {
    const res = await fetcher(`api/deps?dep=${dep || ""}`, o.req)
    const deps = await res.json()
    return { deps, dep }
  } catch (e) {
    console.log("OUCH", e)
    return {}
  }
}

export default Credits
