const d2 = new Map()

const oy = (mod) => {
  if (d2.has(mod)) return

  d2.set(mod, { level: 1 })
  try {
    for (const r in require(mod
      ? `../node_modules/${mod}/package.json`
      : "../package.json").dependencies) {
      if (r === mod || d2.has(r)) continue
      const dd = require(`../node_modules/${r}/package.json`)
      const {
        dependencies,
        name,
        description,
        author,
        homepage,
        version,
        license,
        repository,
        keywords,
        ...rest
      } = dd
      const d3 = dependencies && Object.keys(dependencies)
      const d4 = d3 && d3.length ? d3 : undefined
      const misc = Object.keys(rest).filter((x) => x.indexOf("_"))

      const level = d2.get(mod).level + 1

      d2.set(r, {
        level,
        parent: mod,
        dependencies: d4,
        name,
        description,
        author,
        homepage,
        version,
        license,
        repository,
        keywords,
        misc,
      })
      if (d4) d4.forEach(oy)
    }
    return d2
  } catch (e) {
    // oh well
  }
}

module.exports = oy
