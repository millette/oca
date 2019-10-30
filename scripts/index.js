// core
const fs = require("fs")
const { pipeline } = require("stream")

// npm
const xmlflow = require("xml-flow")
const glob = require("fast-glob")
const through = require("through2")
const uniq = require("lodash.uniq")

const re = /[_-]/g
const rep = (x) => x.replace(re, " ")

const makeMeta = (filename, data) => {
  let s3 = []

  if (data["dc:subject"]) {
    if (typeof data["dc:subject"] === "string") {
      s3 = [data["dc:subject"]]
    } else if (Array.isArray(data["dc:subject"])) {
      s3 = data["dc:subject"]
    }
  }
  const subject = uniq([
    ...filename
      .split("/")
      .slice(1, -1)
      .map(rep),
    ...s3,
  ]).sort()

  const metadata = {
    title: data["dc:title"],
    description: data["dc:description"],
    subject,
    creator:
      (data["dc:creator"] && data["dc:creator"]["dc:title"]) ||
      data["dc:creator"],
    date: data["dc:date"],
  }

  return metadata
}

const tr = () =>
  through.obj(function(filename, enc, cb) {
    xmlflow(fs.createReadStream(filename))
      .on("tag:cc:work", (data) =>
        this.push({ filename, metadata: makeMeta(filename, data) })
      )
      .once("error", (error) => cb(null, { filename, error: error.message }))
      .once("end", cb)
  })

const tr2 = () =>
  through.obj((chunk, enc, cb) => cb(null, JSON.stringify(chunk) + "\n")) //

pipeline(
  glob.stream("clipart/**/*.svg"),
  tr(),
  tr2(),
  process.stdout,
  (err) => err && console.error(err)
)
