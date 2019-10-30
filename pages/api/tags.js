import metadata from "../../metadata.json"

const tags = new Map()

for (const r in metadata) {
  if (metadata[r].subject)
    metadata[r].subject.forEach((s) => tags.set(s, (tags.get(s) || 0) + 1))
}

const tagsArray = Array.from(tags)
  .filter((a) => a[1] >= 2)
  .sort((a, b) => {
    const av = a[1]
    const bv = b[1]
    if (av > bv) return -1
    if (av < bv) return 1
  })

export default (req, res) => res.status(200).json(tagsArray)
