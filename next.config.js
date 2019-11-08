// npm
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
})

module.exports = withBundleAnalyzer(
  withMDX({
    pageExtensions: ["js", "md", "mdx"],
  })
)
