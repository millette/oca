/** @jsx jsx */

// npm
import Head from "next/head"
import { jsx, Styled } from "theme-ui"
// import { jsx, Styled, Flex, Box } from "theme-ui"
// import fetcher from "../lib/fetcher"

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
      <details>
        <Summary>
          <Styled.h4>Dependencies</Styled.h4>
        </Summary>
        <Dependencies />
      </details>
    </>
  )
}

export default Credits
