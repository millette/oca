import "isomorphic-unfetch"

const fetcher = (path, req) =>
  fetch(
    [req ? `http://${req.headers.host}` : "", path].join(
      path[0] === "/" ? "" : "/"
    )
  )

export default fetcher
