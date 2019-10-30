import fs from "fs"
import { pipeline } from "stream"

/*
const cnt = fs.createReadStream(
  "clipart/animals/2_dead_frogs_lumen_desig_01.svg",
  "utf8"
)
*/

export default (req, res) => {
  if (!req.query.key) return res.status(404).end("not found")

  res.status(200).setHeader("Content-Type", "image/svg+xml")
  pipeline(fs.createReadStream(`clipart/${req.query.key}`), res, (err) => {
    if (err) console.error("Oupsy", err)
  })
}
