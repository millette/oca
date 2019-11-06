/** @jsx jsx */

// npm
import Head from "next/head"
import Link from "next/link"
import { useState, useEffect } from "react"
import { jsx, Styled, Flex, Box } from "theme-ui"
import Minisearch from "minisearch"

// self
import searchIndex from "../search-index.json"
import Svg from "../components/svg"

const fields = ["title", "subject", "creator", "description"]
const idx = Minisearch.loadJSON(JSON.stringify(searchIndex), { fields })

const searchOptions = { combineWith: "AND", fuzzy: 0.15 }

const autoSuggest = (str) =>
  idx
    .autoSuggest(str, searchOptions)
    .filter(({ suggestion }) => suggestion !== str)
    .slice(0, 20)
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

const Suggestions = ({ what, suggestions, pick }) => {
  if (what.length < 2 || !suggestions || !suggestions.length) return null
  // <Styled.h4>Did you mean...</Styled.h4>

  // <Styled.div as="small">({Math.round(score)})</Styled.div>
  return (
    <>
      <Styled.h5>Other suggestions</Styled.h5>
      {suggestions.map(({ suggestion, score }) => (
        <Styled.div
          title={`Score: ${score}`}
          as="button"
          sx={{ m: 1, fontSize: 0 }}
          onClick={pick.bind(this, suggestion)}
          key={suggestion}
        >
          {suggestion}
        </Styled.div>
      ))}
    </>
  )

  /*
  return (
    <>
      <Styled.ol>
        {suggestions.map(({ suggestion, score }) => (
          <Styled.li sx={{ listStyle: "none", display: "inline" }} onClick={pick.bind(this, suggestion)} key={suggestion}>
            {suggestion} <Styled.div as="small">({Math.round(score)})</Styled.div>
          </Styled.li>
        ))}
      </Styled.ol>
    </>
  )
  */
}

const Match = ({ id, score, match }) => {
  // <Styled.p>{id} {score}</Styled.p>
  // <Styled.pre>{JSON.stringify(match, null, 2)}</Styled.pre>

  return (
    <Link href={`/key?key=${id}`} passHref>
      <Styled.a>
        <Svg k={id} />
      </Styled.a>
    </Link>
  )
}

const Results = ({ ids }) => {
  if (!ids || !ids.length) return null
  return (
    <>
      <Styled.p>
        Number of results: <Styled.b>{ids.length}</Styled.b>
      </Styled.p>
      <Flex sx={{ flexWrap: "wrap" }}>
        {ids.slice(0, 12).map(({ id, score, match }) => (
          <Box
            key={`${id}-${score}`}
            sx={{ p: 2, width: ["100%", "50%", "33.3%"] }}
          >
            <Match id={id} score={score} match={match} />
          </Box>
        ))}
      </Flex>
    </>
  )
}

const Search = ({ from }) => {
  const [what, setWhat] = useState(from)
  const [results, setResults] = useState({})

  useEffect(() => {
    setResults(
      what ? { suggestions: autoSuggest(what), ids: search(what) } : {}
    )
  }, [what])

  const handleChange = (ev) => setWhat(ev.target.value)

  return (
    <>
      <Head>
        <title>Search - OpenClipArts Explorer</title>
      </Head>

      <Flex>
        <Box sx={{ pr: "2rem", width: "50%" }}>
          <Styled.h3>Search</Styled.h3>
          <Styled.div
            sx={{ width: "100%" }}
            as="input"
            type="text"
            value={what}
            onChange={handleChange}
          />
        </Box>
        <Box sx={{ textAlign: "right", width: "50%" }}>
          <Suggestions
            what={what}
            pick={setWhat}
            suggestions={results.suggestions}
          />
        </Box>
      </Flex>
      <Results ids={results.ids} />
    </>
  )
}

Search.getInitialProps = async (o) => {
  return {
    from: o.query.from || "",
  }
}

export default Search
