import fs from "fs"

const cnt = fs.createReadStream(
  "clipart/animals/2_dead_frogs_lumen_desig_01.svg",
  "utf8"
)

export default (req, res) => {
  res.status(200).setHeader("Content-Type", "image/svg+xml")
  cnt.pipe(res)
}
