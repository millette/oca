import metadata from "../../metadata.json"

export default (req, res) => {
  if (!req.query.key) return res.status(404).end("not found")
  res.status(200).json(metadata[req.query.key])
}
