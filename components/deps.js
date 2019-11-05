/** @jsx jsx */

// npm
import Link from "next/link"
import { jsx, Styled, Flex, Box } from "theme-ui"

const Deps = ({ deps }) => (
  <>
    <Flex>
      <Box sx={{ pr: 4, width: ["100%", "50%"] }}>
        <Styled.h5>
          {deps.pkg.name} ({deps.pkg.version}) {deps.pkg.license}
        </Styled.h5>
        {deps.pkg.description && <Styled.p>{deps.pkg.description}</Styled.p>}
        {deps.pkg.homepage && <Styled.p>{deps.pkg.homepage}</Styled.p>}
        {deps.pkg.author && (
          <Styled.pre>{JSON.stringify(deps.pkg.author, null, 2)}</Styled.pre>
        )}
        {deps.pkg.repository && (
          <Styled.pre>
            {JSON.stringify(deps.pkg.repository, null, 2)}
          </Styled.pre>
        )}
      </Box>
      <Box sx={{ width: ["100%", "50%"] }}>
        {deps.dependencies ? (
          <>
            <Styled.h5>Dependencies</Styled.h5>

            <Styled.ul sx={{ display: "flex", flexWrap: "wrap" }}>
              {deps.dependencies.map((d) => (
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
            <Styled.code>{deps.pkg.name}</Styled.code> has no dependencies
          </Styled.h5>
        )}
      </Box>
    </Flex>

    <Styled.pre>{JSON.stringify(deps, null, 2)}</Styled.pre>
  </>
)

export default Deps
