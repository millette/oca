/** @jsx jsx */

// npm
import Link from "next/link"
import fetcher from "../lib/fetcher"
import { jsx, Styled, Flex, Box } from "theme-ui"

// self
import Sample from "../components/sample"

const Tagged = ({ d, tag, t2 }) => (
  <>
    <Styled.h3>
      <Link passHref href="/">
        <Styled.a>All tags</Styled.a>
      </Link>
    </Styled.h3>
    <Styled.h4>Tagged with {tag}</Styled.h4>

    <Flex sx={{ flexWrap: "wrap" }}>
      <Box sx={{ width: ["100%", "50%"] }}>
        <Styled.ol>
          {d.map((key) => (
            <Styled.li key={key}>
              <Link
                passHref
                href={{ pathname: "/key", query: { key } }}
                as={`/key?key=${key}`}
              >
                <Styled.a>{key}</Styled.a>
              </Link>
            </Styled.li>
          ))}
        </Styled.ol>
      </Box>
      <Box sx={{ width: ["100%", "50%"] }}>
        <Sample data={t2} />
      </Box>
    </Flex>
  </>
)

Tagged.getInitialProps = async (o) => {
  const tag = o.query.tag || ""
  const res = await fetcher(
    o.req,
    "http://localhost:3000/api/tagged-keys?tag=" + tag
  )
  const d = await res.json()

  const res2 = await fetcher(
    o.req,
    "http://localhost:3000/api/sample?tag=" + tag
  )
  const t2 = await res2.json()

  return { tag, d, t2 }
}

export default Tagged
