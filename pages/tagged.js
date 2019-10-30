// npm
import Link from "next/link"
import "isomorphic-unfetch"

const Tagged = ({ d, tag }) => (
  <div>
    <h1>
      <Link href="/tags">
        <a>All tags</a>
      </Link>
    </h1>
    <h2>Tagged with {tag}</h2>
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

Tagged.getInitialProps = async (o) => {
  const tag = o.query.tag || ""

  const res = await fetch("http://localhost:3000/api/tagged-keys?tag=" + tag)
  const d = await res.json()
  return { tag, d }

  // return { tag: o.query.tag }
  /*
  const res = await fetch("http://localhost:3000/api/all-keys")
  const d = await res.json()
  return { d }
  */
}

export default Tagged
