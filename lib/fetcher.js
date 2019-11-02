import "isomorphic-unfetch"

const fetcher = (req, path) =>
  fetch(
    [req ? `http://${req.headers.host}` : "", path].join(
      path[0] === "/" ? "" : "/"
    )
  )

export default fetcher
