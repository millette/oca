import metadata from "../../metadata.json"

export default (req, res) => {
  const p = req.query.prefix
  const keys = Object.keys(metadata).filter((x) => x.startsWith(p))

  res.status(200).json(keys)
}
