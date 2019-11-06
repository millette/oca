"use strict"

// core
const { writeFile } = require("fs")

// npm
const Minisearch = require("minisearch")

// self
const data = require("../metadata.json")

const fields = ["title", "subject", "creator", "description"]
const idx = new Minisearch({ fields })

for (const id in data) {
  const subject = data[id].subject && JSON.stringify(data[id].subject)
  idx.add({
    ...data[id],
    id,
    subject,
  })
}

// console.log(JSON.stringify(idx))

writeFile("hola-out.json", JSON.stringify(idx), (err) => {
  console.log("DONE", err || "")
})
