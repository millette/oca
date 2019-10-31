// npm
import Link from "next/link"
import fetcher from "../lib/fetcher"

const Tags = ({ t }) => (
  <div>
    <ol>
      {t.map(([k, n]) => (
        <li key={k}>
          <Link
            href={{ pathname: "/tagged", query: { tag: k } }}
            as={`/tagged?tag=${k}`}
          >
            <a>
              {k} ({n})
            </a>
          </Link>
        </li>
      ))}
    </ol>
  </div>
)

Tags.getInitialProps = async (o) => {
  const n = o.query.n || 50
  const res = await fetcher(o.req, "http://localhost:3000/api/tags?n=" + n)
  const t = await res.json()
  return { t }
}

export default Tags
