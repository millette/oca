// npm
import "isomorphic-unfetch"

const FrontPage = ({ d }) => (
  <div style={{ display: "flex" }}>
    <img src="/api/show-one" />
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

FrontPage.getInitialProps = async (o) => {
  const res = await fetch("http://localhost:3000/api/one")
  const d = await res.json()
  return { d }
}

export default FrontPage
