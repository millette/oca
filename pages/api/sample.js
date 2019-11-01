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

const keys = Object.keys(metadata)

const optOne = async (fn) => {
  const cnt = await fs.readFile(`clipart/${fn}`)
  const { data: svg } = await svgo.optimize(cnt)
  return { svg, fn }
}

export default async (req, res) => {
  const s = sample(keys, 12)

  const t = await Promise.all(s.map(optOne))
  res.status(200).json(t)
}
