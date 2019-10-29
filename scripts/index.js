// core
const fs = require("fs")

// npm
const xmlflow = require("xml-flow")

const jlog = (x) => console.log(JSON.stringify(x, null, 2))

xmlflow(fs.createReadStream("clipart/animals/armadillo_architetto_fra_01.svg"))
  .on("tag:metadata", jlog)
  .on("error", console.error)
