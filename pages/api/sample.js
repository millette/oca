// core
import { promises as fs } from "fs"

// npm
import sample from "lodash.samplesize"
import SVGO from "svgo"

// self
import metadata from "../../metadata.json"

const svgo = new SVGO({
  plugins: [
    { removeXMLNS: true },
    { reusePaths: true },
    { removeDimensions: true },
  ],
})

const allKeys = Object.keys(metadata)

const optOne = async (fn) => {
  try {
    const cnt = await fs.readFile(`clipart/${fn}`)
    const { data: svg } = await svgo.optimize(cnt)
    return { svg, fn }
  } catch (e) {
    // console.error('Oupsy:', e)
  }
}

export default async (req, res) => {
  const tag = req.query.tag

  let keys = []
  if (tag) {
    for (const r in metadata) {
      if (metadata[r].subject && metadata[r].subject.indexOf(tag) !== -1)
        keys.push(r)
    }
  } else {
    keys = allKeys
  }

  const s = sample(keys, 8)

  const t = await Promise.all(s.map(optOne))
  res.status(200).json(t.filter(Boolean).slice(0, 6))
}
