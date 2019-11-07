/** @jsx jsx */

// npm
import Link from "next/link"
import fetcher from "../lib/fetcher"
import { jsx, Styled, Flex, Box } from "theme-ui"

// self
import Sample from "../components/sample"
import PageTitle from "../components/page-title"

const Tagged = ({ d, tag, t2 }) => (
  <>
    <PageTitle>{`Tagged with ${tag}`}</PageTitle>
    <Styled.h3>Tagged with {tag}</Styled.h3>

    <Styled.p>
      You can also{" "}
      <Link href={`/search?from=${tag}`} passHref>
        <Styled.a>search for cliparts with the {tag} query</Styled.a>
      </Link>
      .
    </Styled.p>

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
  const res = await fetcher("api/tagged-keys?tag=" + tag, o.req)
  const d = await res.json()

  const res2 = await fetcher("api/sample?tag=" + tag, o.req)
  const t2 = await res2.json()

  return { tag, d, t2 }
}

export default Tagged
