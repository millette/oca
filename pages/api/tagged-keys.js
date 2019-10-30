import metadata from "../../metadata.json"

export default (req, res) => {
  const t = req.query.tag

  const keys = []

  for (const r in metadata) {
    if (metadata[r].subject && metadata[r].subject.indexOf(t) !== -1)
      keys.push(r)
  }

  res.status(200).json(keys)
}
