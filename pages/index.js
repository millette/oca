/** @jsx jsx */

// npm
import Link from "next/link"
import fetcher from "../lib/fetcher"
import { jsx, Styled } from "theme-ui"

const Tags = ({ t }) => (
  <div>
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
  </div>
)

Tags.getInitialProps = async (o) => {
  const n = o.query.n || 50
  const res = await fetcher(o.req, "http://localhost:3000/api/tags?n=" + n)
  const t = await res.json()
  return { t }
}

export default Tags
