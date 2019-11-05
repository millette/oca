// npm
import readPkg from "read-pkg"

export default (req, res) => {
  // console.log('API', req.query)
  const { dep } = req.query

  try {
    // battling webpack
    const p = dep && eval(`require.resolve("${dep}")`)

    const ret = { dep, p }
    console.log("RET", ret)

    res.status(200).json(ret)
  } catch (e) {
    console.log("YIKES", e)
    res.status(404).send("Not found???")
  }
}

/*
const p = dep || "../.."
const p2 = [p, "package.json"].join("/")

console.log("PPP", p, dep, p2)
const { dependencies } = require(p2)
res.status(200).json(Object.keys(dependencies))
*/
