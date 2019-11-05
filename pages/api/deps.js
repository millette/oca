// core
import { dirname } from "path"

// npm
import readPkg from "read-pkg-up"

const okRe = /^[\d@a-z/.-]+$/
const depOk = (d) => {
  if (!d) return
  if (okRe.test(d)) return true
  const err = new Error("Invalid module name")
  err.given = JSON.stringify(`${d}`)
  throw err
}

const cleanPkg = ({ packageJson: json, path }, full) => {
  const ppp = {}
  for (const r in json) {
    if (!r.indexOf("_")) continue
    if (r.endsWith("ependencies")) {
      ppp[r] = Object.keys(json[r]).sort()
    } else {
      ppp[r] = json[r]
    }
  }

  if (full) {
    const { dependencies, ...pkg } = ppp
    return { dependencies, pkg, path, full }
  }
  const { dependencies, ...pkg2 } = ppp
  const pkg = {
    name: pkg2.name,
    version: pkg2.version,
    description: pkg2.description,
    license: pkg2.license,
    engines: pkg2.engines,
    homepage: pkg2.homepage,
    repository: pkg2.repository,
    author: pkg2.author,
  }
  return { dependencies, pkg, path, full }
}

export default async (req, res) => {
  const { dep } = req.query

  try {
    // battling webpack
    const cwd = dirname(depOk(dep) ? eval(`require.resolve("${dep}")`) : ".")
    const pkg = await readPkg({ cwd })
    res.status(200).json({ dep, cwd, ...cleanPkg(pkg, req.query.full) })
  } catch (e) {
    res.status(404).send("Not found??? " + e.message)
  }
}
