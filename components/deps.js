/** @jsx jsx */

// npm
import Link from "next/link"
import { jsx, Styled, Flex, Box } from "theme-ui"

// self
import ExternalLink from "./external-link"

const Author = ({ author }) => {
  if (!author || !(author.name || author.url)) return null
  if (!author.url) return <Styled.p>{author.name}</Styled.p>
  return (
    <Styled.p>
      <ExternalLink href={author.url}>{author.name}</ExternalLink>
    </Styled.p>
  )
}

const Repository = ({ repository, homepage }) => {
  if (!repository || !repository.url) return null
  // if (repository.type !== "git") return <Styled.p>{repository.url}</Styled.p>
  let u = repository.url.replace(/\.git$/, "").replace(/^git\+/, "")
  if (!/^https{0,1}:\/\//.test(u))
    u = u.replace(/^ssh:\/\/git@/, "https://").replace(/^git:/, "https:")

  if (u === homepage) return null
  return (
    <Styled.p>
      <ExternalLink href={u} />
    </Styled.p>
  )
}

const Keywords = ({ keywords }) => {
  if (!keywords) return null
  return <Styled.div as="small">{keywords.join(", ")}</Styled.div>
}

const Deps = ({
  deps: {
    pkg: {
      keywords,
      name,
      version,
      license,
      description,
      homepage,
      author,
      repository,
      ...rest2
    },
    dependencies,
    ...rest
  },
}) => (
  <>
    <Flex>
      <Box sx={{ pr: 4, width: ["100%", "50%"] }}>
        <Styled.h5>
          {name} ({version}) {license}
        </Styled.h5>
        {description && <Styled.p>{description}</Styled.p>}
        <Keywords keywords={keywords} />
        {homepage && (
          <Styled.p>
            <ExternalLink href={homepage} />
          </Styled.p>
        )}
        <Author author={author} />
        <Repository repository={repository} homepage={homepage} />
      </Box>
      <Box sx={{ width: ["100%", "50%"] }}>
        {dependencies && dependencies.length ? (
          <>
            <Styled.h5>Dependencies</Styled.h5>

            <Styled.ul sx={{ display: "flex", flexWrap: "wrap" }}>
              {dependencies.map((d) => (
                <Styled.li key={d} sx={{ mx: 2, listStyle: "none" }}>
                  <Link href={`/credits?dep=${d}`} passHref>
                    <Styled.a>{d}</Styled.a>
                  </Link>
                </Styled.li>
              ))}
            </Styled.ul>
          </>
        ) : (
          <Styled.h5>
            <Styled.code>{name}</Styled.code> has no dependencies
          </Styled.h5>
        )}
      </Box>
    </Flex>
  </>
)

// <Styled.pre>{JSON.stringify(rest, null, 2)}</Styled.pre>
// <Styled.pre>{JSON.stringify(rest2, null, 2)}</Styled.pre>

export default Deps
