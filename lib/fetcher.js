import "isomorphic-unfetch"

const fetcher = (req, url) => {
  if (typeof url === "string") url = new URL(url)
  const u = req ? url.href : `${url.pathname}${url.search}`
  return fetch(u)
}

export default fetcher
