// npm
import "isomorphic-unfetch"

const Page = ({ k, d }) => (
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
)

Page.getInitialProps = async (o) => {
  const u =
    o.req && new URL("http://localhost" + o.req.url).searchParams.get("key")
  const res = await fetch("http://localhost:3000/api/one-key?key=" + u)
  const d = await res.json()
  return { k: u, d }
}

export default Page
