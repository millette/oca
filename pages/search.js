/** @jsx jsx */

// npm
import Link from "next/link"
import { useState, useEffect } from "react"
import { jsx, Styled, Flex, Box } from "theme-ui"
import Minisearch from "minisearch"

// self
import searchIndex from "../search-index.json"
import Svg from "../components/svg"
import PageTitle from "../components/page-title"

const PER_PAGE = 6
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

const Suggestions = ({ what, suggestions, pick }) =>
  what.length < 2 || !suggestions || !suggestions.length ? null : (
    <>
      <Styled.h5>Other suggestions</Styled.h5>
      {suggestions.map(({ suggestion, score }) => (
        <Link key={suggestion} href={`/search?from=${suggestion}`} passHref>
          <Styled.a
            title={`Score: ${score}`}
            // as="button"
            sx={{ m: 1, fontSize: 0 }}
            onClick={pick.bind(this, suggestion)}
          >
            {suggestion}
          </Styled.a>
        </Link>
      ))}
    </>
  )

const Match = ({ id }) => (
  <Link href={`/key?key=${id}`} passHref>
    <Styled.a>
      <Svg k={id} />
    </Styled.a>
  </Link>
)

const Pager = ({ isMore, page, setPage }) => {
  return (
    <Flex sx={{ my: "1rem", justifyContent: "space-between" }}>
      <Box>
        {page > 0 && (
          <Styled.div as="button" onClick={() => setPage(page - 1)}>
            Previous results
          </Styled.div>
        )}
      </Box>

      {isMore() && (
        <Box>
          <Styled.div as="button" onClick={() => setPage(page + 1)}>
            Next results
          </Styled.div>
        </Box>
      )}
    </Flex>
  )
}

const Results = ({ ids }) => {
  const [page, setPage] = useState(0)

  const isMore = () => page + 1 < Math.ceil(ids.length / PER_PAGE)

  useEffect(() => {
    setPage(0)
  }, [ids])

  if (!ids || !ids.length) return null
  return (
    <>
      <Styled.p>
        Number of results: <Styled.b>{ids.length}</Styled.b>
      </Styled.p>

      <Pager isMore={isMore} page={page} setPage={setPage} />

      <Flex sx={{ flexWrap: "wrap" }}>
        {ids
          .slice(page * PER_PAGE, (page + 1) * PER_PAGE)
          .map(({ id, score, match }) => (
            <Box
              key={`${id}-${score}`}
              sx={{
                ":hover": { bg: "#fff" },
                p: 2,
                overflow: "hidden",
                maxHeight: "300px",
                width: ["100%", "50%", "33.3%"],
              }}
            >
              <Match id={id} score={score} match={match} />
            </Box>
          ))}
      </Flex>

      <Pager isMore={isMore} page={page} setPage={setPage} />
    </>
  )
}

const Search = ({ from }) => {
  const [what, setWhat] = useState(from || "")
  const [results, setResults] = useState({})

  useEffect(() => {
    setResults(
      what ? { suggestions: autoSuggest(what), ids: search(what) } : {}
    )
  }, [what])

  const handleChange = (ev) => setWhat(ev.target.value)

  return (
    <>
      <PageTitle>Search</PageTitle>
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

Search.getInitialProps = async ({ query: { from } }) => ({ from })
export default Search
