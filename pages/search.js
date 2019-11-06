/** @jsx jsx */

// npm
import Head from "next/head"
import { useState, useEffect } from "react"
import { jsx, Styled } from "theme-ui"
import Minisearch from "minisearch"
// import fetcher from "../lib/fetcher"

// self
import searchIndex from "../search-index.json"

// const what = 'night'

const fields = ["title", "subject", "creator", "description"]
const idx = Minisearch.loadJSON(JSON.stringify(searchIndex), { fields })

const searchOptions = { combineWith: "AND", fuzzy: 0.15 }

const autoSuggest = (str) =>
  idx
    .autoSuggest(str, searchOptions)
    .map(({ suggestion, score }) => ({ suggestion, score }))

const searchMapper = (item) => {
  const match = {}

  for (const r in item.match) {
    item.match[r].forEach((x) => {
      if (!match[x]) match[x] = []
      match[x].push(r)
    })
  }

  const m2 = []
  for (const field in match) {
    m2.push({ field, terms: match[field] })
  }

  const m3 = m2.sort((a, b) => {
    const na = a.terms.length
    const nb = b.terms.length
    if (na > nb) return -1
    if (na < nb) return 1
  })

  return {
    ...item,
    match: m3,
    terms: undefined,
  }
}

const search = (str) => idx.search(str, searchOptions).map(searchMapper)

const Suggestions = ({ suggestions }) => {
  if (!suggestions || !suggestions.length) return null
  // <Styled.pre>{JSON.stringify(suggestions, null, 2)}</Styled.pre>
  return (
    <>
      <Styled.h4>Did you mean...</Styled.h4>
      <Styled.ol>
        {suggestions.map(({ suggestion, score }) => (
          <Styled.li key={suggestion}>
            {suggestion} ({Math.round(score)})
          </Styled.li>
        ))}
      </Styled.ol>
    </>
  )
}

const Results = ({ ids }) => {
  if (!ids || !ids.length) return null
  return <Styled.pre>{JSON.stringify(ids, null, 2)}</Styled.pre>
}

const Search = (props) => {
  const [what, setWhat] = useState()
  const [results, setResults] = useState({})

  useEffect(() => {
    setResults({
      suggestions: what ? autoSuggest(what) : undefined,
      ids: what ? search(what) : undefined,
    })
  }, [what])

  const handleChange = (ev) => setWhat(ev.target.value)

  return (
    <>
      <Head>
        <title>Search - OpenClipArts Explorer</title>
      </Head>

      <Styled.h3>Search</Styled.h3>
      <Styled.div as="input" defaultValue={what} onChange={handleChange} />

      <Suggestions suggestions={results.suggestions} />
      <Results ids={results.ids} />
    </>
  )
}

export default Search
