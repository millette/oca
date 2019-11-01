/** @jsx jsx */

// npm
import Link from "next/link"
import fetcher from "../lib/fetcher"
import { jsx, Styled } from "theme-ui"

const Key = ({ d, __html }) => (
  <div>
    <Link passHref href="/">
      <Styled.a>Show tags</Styled.a>
    </Link>

    <div style={{ display: "flex" }}>
      <div dangerouslySetInnerHTML={{ __html }} />
      <div>
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
      </div>
    </div>
  </div>
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
