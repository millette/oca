"use strict"

// core
const fs = require("fs")
const { pipeline } = require("stream")

// npm
const xmlflow = require("xml-flow")
const glob = require("fast-glob")
const through = require("through2")
const uniq = require("lodash.uniq")
const jsonstream = require("jsonstream2")

const re = /[_-]/g
const rep = (x) => x.replace(re, " ")

const makeMeta = (filename, data) => {
  let s3 = []

  if (data["dc:subject"]) {
    if (typeof data["dc:subject"] === "string") {
      s3 = [rep(data["dc:subject"])]
    } else if (Array.isArray(data["dc:subject"])) {
      s3 = data["dc:subject"].filter(Boolean).map(rep)
    }
  }

  const subject = uniq([
    ...filename
      .split("/")
      .slice(0, -1)
      .map(rep),
    ...s3,
  ])
    .filter(Boolean)
    .sort()

  return [
    filename,
    {
      title: data["dc:title"],
      description: data["dc:description"],
      subject,
      creator:
        (data["dc:creator"] && data["dc:creator"]["dc:title"]) ||
        data["dc:creator"],
    },
  ]
}

const nop = () => false

const tr = () =>
  through.obj((filename, enc, cb) =>
    xmlflow(fs.createReadStream(`clipart/${filename}`))
      .once("tag:cc:work", (data) => cb(null, makeMeta(filename, data)))
      .once("error", nop)
  )

pipeline(
  glob.stream("**/*.svg", { cwd: "clipart" }),
  tr(),
  jsonstream.stringifyObject(),
  fs.createWriteStream("metadata.json"),
  (err) => err && console.error(err)
)
