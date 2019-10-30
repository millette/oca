// npm
import Link from "next/link"
// import "isomorphic-unfetch"
import fetcher from "../lib/fetcher"

const All = ({ d }) => (
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

All.getInitialProps = async (o) => {
  const res = await fetcher(o.req, "http://localhost:3000/api/all-keys")
  const d = await res.json()
  return { d }
}

export default All
