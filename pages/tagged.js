/** @jsx jsx */

// npm
import Link from "next/link"
import fetcher from "../lib/fetcher"
import { jsx, Styled } from "theme-ui"

const Tagged = ({ d, tag }) => (
  <>
    <Styled.h3>
      <Link passHref href="/">
        <Styled.a>All tags</Styled.a>
      </Link>
    </Styled.h3>
    <Styled.h4>Tagged with {tag}</Styled.h4>
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
  </>
)

Tagged.getInitialProps = async (o) => {
  const tag = o.query.tag || ""
  const res = await fetcher(
    o.req,
    "http://localhost:3000/api/tagged-keys?tag=" + tag
  )
  const d = await res.json()
  return { tag, d }
}

export default Tagged
