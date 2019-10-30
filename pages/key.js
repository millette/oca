// npm
import Link from "next/link"
// import "isomorphic-unfetch"
import fetcher from "../lib/fetcher"

const Key = ({ k, d }) => (
  <div>
    <Link href="/tags">
      <a>Show tags</a>
    </Link>

    <div style={{ display: "flex" }}>
      <img src={"/api/show-one-key?key=" + k} />
      <div>
        <h1>{d.title}</h1>
        <h2>{d.creator}</h2>
        {d.description && <p>{d.description}</p>}
        {d.subject && d.subject.length && (
          <ul>
            {d.subject.map((subject) => (
              <li key={subject}>{subject}</li>
            ))}
          </ul>
        )}
        <pre>{JSON.stringify(d, null, 2)}</pre>
      </div>
    </div>
  </div>
)

Key.getInitialProps = async (o) => {
  const k = o.query.key
  const res = await fetcher(o.req, "http://localhost:3000/api/one-key?key=" + k)
  const d = await res.json()
  return { k, d }
}

export default Key
