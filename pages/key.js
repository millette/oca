/** @jsx jsx */

// npm
import Link from "next/link"
import fetcher from "../lib/fetcher"
import { jsx, Styled, Flex, Box } from "theme-ui"

const Key = ({ d, __html }) => (
  <>
    <Styled.h3>
      <Link passHref href="/">
        <Styled.a>Show tags</Styled.a>
      </Link>
    </Styled.h3>
    <Flex sx={{ flexWrap: "wrap" }}>
      <Box
        sx={{ width: ["100%", "50%"] }}
        dangerouslySetInnerHTML={{ __html }}
      />
      <Box sx={{ width: ["100%", "50%"] }}>
        <Styled.h1>{d.title}</Styled.h1>
        <Styled.h2>by {d.creator}</Styled.h2>
        {d.description && <Styled.p>{d.description}</Styled.p>}
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

Key.getInitialProps = async (o) => {
  const k = o.query.key

  const res = await fetcher(o.req, "http://localhost:3000/api/one-key?key=" + k)
  const d = await res.json()

  const res2 = await fetcher(
    o.req,
    "http://localhost:3000/api/show-one-key?key=" + k
  )

  const __html = await res2.text()
  return { d, __html }
}

export default Key
