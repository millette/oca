/** @jsx jsx */

// npm
import Link from "next/link"
import fetcher from "../lib/fetcher"
import { jsx, Styled, Flex, Box } from "theme-ui"

// self
import Svg from "../components/svg"

const Tags = ({ t, t2 }) => (
  <>
    <Styled.h3>All tags</Styled.h3>
    <Flex sx={{ flexWrap: "wrap" }}>
      <Box sx={{ width: ["100%", "50%"] }}>
        <Styled.ol>
          {t.map(([k, n]) => (
            <Styled.li key={k}>
              <Link
                passHref
                href={{ pathname: "/tagged", query: { tag: k } }}
                as={`/tagged?tag=${k}`}
              >
                <Styled.a>
                  {k} ({n})
                </Styled.a>
              </Link>
            </Styled.li>
          ))}
        </Styled.ol>
      </Box>

      <Box sx={{ width: ["100%", "50%"] }}>
        <Flex sx={{ maxHeight: 200, flexWrap: "wrap" }}>
          {t2.map(({ svg, fn }) => (
            <Box
              key={fn}
              sx={{ p: 16, overflow: "hidden", width: ["100%", "33.333%"] }}
            >
              <Link href={{ pathname: "/key", query: { key: fn } }}>
                <a>
                  <Svg svg={svg} />
                </a>
              </Link>
            </Box>
          ))}
        </Flex>
      </Box>
    </Flex>
  </>
)

Tags.getInitialProps = async (o) => {
  const n = o.query.n || 50
  const res = await fetcher(o.req, "http://localhost:3000/api/tags?n=" + n)
  const t = await res.json()

  const res2 = await fetcher(o.req, "http://localhost:3000/api/sample")
  const t2 = await res2.json()

  return { t, t2 }
}

export default Tags
