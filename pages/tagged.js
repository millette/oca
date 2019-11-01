/** @jsx jsx */

// npm
import Link from "next/link"
import fetcher from "../lib/fetcher"
import { jsx, Styled } from "theme-ui"

const Tagged = ({ d, tag }) => (
  <div>
    <Styled.h1>
      <Link passHref href="/">
        <Styled.a>All tags</Styled.a>
      </Link>
    </Styled.h1>
    <Styled.h2>Tagged with {tag}</Styled.h2>
    <Styled.ol>
      {d.map((k) => (
        <Styled.li key={k}>
          <Link
            passHref
            href={{ pathname: "/key", query: { key: k } }}
            as={`/key?key=${k}`}
          >
            <Styled.a>{k}</Styled.a>
          </Link>
        </Styled.li>
      ))}
    </Styled.ol>
  </div>
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
