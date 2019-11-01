/** @jsx jsx */

// npm
import Link from "next/link"
import fetcher from "../lib/fetcher"
import { jsx, Styled, Flex, Box } from "theme-ui"

// self
import Svg from "../components/svg"

const Key = ({ d, svg, sizes, k }) => {
  console.log("KEY-2", k, sizes)

  return (
    <>
      <Styled.h3>
        <Link passHref href="/">
          <Styled.a>Show tags</Styled.a>
        </Link>
      </Styled.h3>
      <Flex sx={{ flexWrap: "wrap" }}>
        <Box sx={{ overflowX: "hidden", width: ["100%", "50%"] }}>
          <Svg svg={svg} />
        </Box>
        <Box sx={{ width: ["100%", "50%"] }}>
          <Styled.h1>{d.title}</Styled.h1>
          <Styled.h2>by {d.creator}</Styled.h2>
          {d.description && <Styled.p>{d.description}</Styled.p>}
          <Styled.table>
            <Styled.tr>
              <Styled.th>Original</Styled.th>

              <Styled.td sx={{ fontStyle: "italic" }}>with metadata</Styled.td>

              <Styled.td>
                <Styled.a href={`/api/show-one-key?key=${k}`} download>
                  download
                </Styled.a>
              </Styled.td>

              <Styled.td sx={{ textAlign: "right" }}>
                {sizes.original}
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

              <Styled.td sx={{ textAlign: "right" }}>
                {sizes.optimized}
              </Styled.td>
            </Styled.tr>
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
    </>
  )
}

Key.getInitialProps = async (o) => {
  const { key } = o.query
  console.log("KEY-0", key)

  const res = await fetcher(
    o.req,
    "http://localhost:3000/api/one-key?key=" + key
  )
  const d = await res.json()

  const res2 = await fetcher(
    o.req,
    // "http://localhost:3000/api/show-one-key?key=" + k
    "http://localhost:3000/api/opt-one-key?sizes=1&key=" + key
  )

  //const svg = await res2.text()
  const { svg, sizes } = await res2.json()
  console.log("KEY-1", key)
  return { d, svg, sizes, k: key }
}

export default Key
