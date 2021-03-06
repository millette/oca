/** @jsx jsx */

// npm
import Link from "next/link"
import { jsx, Flex, Box } from "theme-ui"

// self
import Svg from "./svg"

const Sample = ({ data }) => (
  <Flex sx={{ flexWrap: "wrap" }}>
    {data.map(({ svg, fn }) => (
      <Box
        key={fn}
        sx={{
          p: 16,
          maxHeight: "200px",
          overflow: "hidden",
          width: ["100%", "33.333%"],
        }}
      >
        <Link href={{ pathname: "/key", query: { key: fn } }}>
          <a>
            <Svg svg={svg} />
          </a>
        </Link>
      </Box>
    ))}
  </Flex>
)

export default Sample
