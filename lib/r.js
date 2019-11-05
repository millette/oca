const deps = require("./deps")

console.error("DONE")
console.log(JSON.stringify(Array.from(deps().values())))
