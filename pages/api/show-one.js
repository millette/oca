import fs from "fs"
import { pipeline } from "stream"

const cnt = fs.createReadStream(
  "clipart/animals/2_dead_frogs_lumen_desig_01.svg",
  "utf8"
)

export default (req, res) => {
  res.status(200).setHeader("Content-Type", "image/svg+xml")
  // cnt.pipe(res)
  pipeline(cnt, res, (err) => {
    if (err) console.error("Oupsy", err)
  })
}
