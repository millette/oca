// npm
import Link from "next/link"
// import "isomorphic-unfetch"
import fetcher from "../lib/fetcher"

const Prefixed = ({ d }) => (
  <div>
    <ol>
      {d.map((k) => (
        <li key={k}>
          <Link
            href={{ pathname: "/key", query: { key: k } }}
            as={`/key?key=${k}`}
          >
            <a>{k}</a>
          </Link>
        </li>
      ))}
    </ol>
  </div>
)

Prefixed.getInitialProps = async (o) => {
  const p = o.query.prefix
  const res = await fetcher(
    o.req,
    "http://localhost:3000/api/prefixed-keys?prefix=" + p
  )
  const d = await res.json()
  return { d }
}

export default Prefixed
