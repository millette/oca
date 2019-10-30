import metadata from "../../metadata.json"

const tags = new Map()

for (const r in metadata) {
  if (metadata[r].subject)
    metadata[r].subject.forEach((s) => tags.set(s, (tags.get(s) || 0) + 1))
}

const tagsArray = Array.from(tags).sort((a, b) => {
  const av = a[0]
  const bv = b[0]
  if (av > bv) return 1
  if (av < bv) return -1
})

export default (req, res) => {
  const n = req.query.n || 50
  const f = tagsArray.filter((a) => a[1] > n)
  res.status(200).json(f)
}
