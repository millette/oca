/** @jsx jsx */

// npm
import Link from "next/link"
import Head from "next/head"
import { useState } from "react"
import fetcher from "../lib/fetcher"
import { jsx, Styled, Flex, Box } from "theme-ui"
import filesize from "filesize"

// self
import Svg from "../components/svg"

const size = filesize.partial({ standard: "iec" })
const white = "#fff"

const Key = ({ d, svg, sizes, k }) => {
  const [forceWhite, setForceWhite] = useState({})
  const handleEnter = () => !forceWhite.forced && setForceWhite({ white })
  const handleLeave = () => !forceWhite.forced && setForceWhite({})
  const handleForce = () => setForceWhite({ white, forced: !forceWhite.forced })

  return (
    <Flex sx={{ flexWrap: "wrap" }}>
      <Head>
        <title>
          {[d.title, d.creator].join(" by ")} - OpenClipArts Explorer
        </title>
      </Head>

      <Box
        title={
          forceWhite.forced
            ? "Click to release white background"
            : "Click to force a white background"
        }
        onClick={handleForce}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        style={{ background: forceWhite.white }}
        sx={{ textAlign: "right", overflowX: "hidden", width: ["100%", "50%"] }}
      >
        <Styled.i
          sx={{
            p: 2,
            bg: "background",
            color: forceWhite.white ? undefined : white,
          }}
        >
          Nothing visible?
        </Styled.i>
        <Svg style={{ padding: "0.5rem" }} svg={svg} />
      </Box>
      <Box sx={{ pl: "1rem", width: ["100%", "50%"] }}>
        <Styled.h1>{d.title}</Styled.h1>
        <Styled.h2>by {d.creator}</Styled.h2>
        {d.description && <Styled.p>{d.description}</Styled.p>}
        <Styled.table>
          <tbody>
            <Styled.tr>
              <Styled.th>Original</Styled.th>
              <Styled.td sx={{ fontStyle: "italic" }}>with metadata</Styled.td>
              <Styled.td>
                <Styled.a href={`/api/show-one-key?key=${k}`} download>
                  download
                </Styled.a>
              </Styled.td>
              <Styled.td style={{ textAlign: "right" }}>
                {size(sizes.original)}
              </Styled.td>
            </Styled.tr>
            <Styled.tr>
              <Styled.th>Optimized</Styled.th>
              <Styled.td sx={{ fontStyle: "italic" }}>as shown</Styled.td>
              <Styled.td>
                <Styled.a href={`/api/opt-one-key?key=${k}`} download>
                  download
                </Styled.a>
              </Styled.td>
              <Styled.td style={{ textAlign: "right" }}>
                {size(sizes.optimized)}
              </Styled.td>
            </Styled.tr>
            <Styled.tr>
              <Styled.th>Ratio</Styled.th>
              <Styled.td colSpan={2} sx={{ fontStyle: "italic" }}>
                saving
              </Styled.td>
              <Styled.td style={{ textAlign: "right" }}>
                {100 - Math.round((100 * sizes.optimized) / sizes.original)}%
              </Styled.td>
            </Styled.tr>
          </tbody>
        </Styled.table>

        {d.subject && d.subject.length && (
          <Styled.ul>
            {d.subject.map((tag) => (
              <Styled.li key={tag}>
                <Link passHref href={{ pathname: "/tagged", query: { tag } }}>
                  <Styled.a>{tag}</Styled.a>
                </Link>
              </Styled.li>
            ))}
          </Styled.ul>
        )}
      </Box>
    </Flex>
  )
}

Key.getInitialProps = async (o) => {
  const { key } = o.query

  const res = await fetcher("api/one-key?key=" + key, o.req)
  const d = await res.json()

  const res2 = await fetcher("api/opt-one-key?sizes=1&key=" + key, o.req)

  const { svg, sizes } = await res2.json()
  return { d, svg, sizes, k: key }
}

export default Key
