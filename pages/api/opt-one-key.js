import { promises as fs } from "fs"

// npm
import SVGO from "svgo"

const svgo = new SVGO({
  plugins: [
    { removeXMLNS: true },
    { reusePaths: true },
    { removeDimensions: true },
  ],
})

export default async (req, res) => {
  if (!req.query.key) return res.status(404).end("not found")
  const cnt = await fs.readFile(`clipart/${req.query.key}`)
  const { data: svg } = await svgo.optimize(cnt)

  if (!req.query.sizes) {
    res.status(200).setHeader("Content-Type", "image/svg+xml")
    return res.end(svg)
  }

  const sizes = {
    original: cnt.length,
    optimized: svg.length,
  }

  res.status(200).json({
    sizes,
    svg,
  })
}
