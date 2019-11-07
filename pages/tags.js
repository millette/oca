/** @jsx jsx */

// npm
import Link from "next/link"
import fetcher from "../lib/fetcher"
import { jsx, Styled, Flex, Box } from "theme-ui"

// self
import Sample from "../components/sample"
import PageTitle from "../components/page-title"

const Tags = ({ t, t2 }) => (
  <>
    <PageTitle>Browse</PageTitle>
    <Styled.h3>All tags</Styled.h3>
    <Flex sx={{ flexWrap: "wrap" }}>
      <Box sx={{ width: ["100%", "50%"] }}>
        <Styled.ol>
          {t.map(([k, n]) => (
            <Styled.li key={k}>
              <Link passHref href={{ pathname: "/tagged", query: { tag: k } }}>
                <Styled.a>
                  {k} ({n})
                </Styled.a>
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

Tags.getInitialProps = async (o) => {
  const r = await Promise.all([
    fetcher("api/tags?n=" + (o.query.n || 50), o.req),
    fetcher("api/sample", o.req),
  ])
  const [t, t2] = await Promise.all(r.map((x) => x.json()))
  return { t, t2 }
}

export default Tags
