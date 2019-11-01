/** @jsx jsx */

// npm
import App from "next/app"
import Link from "next/link"
import { jsx, ThemeProvider, Styled, ColorMode } from "theme-ui"
import { roboto as theme } from "@theme-ui/presets"

const components = {
  a: ({ children, href }) => (
    <Link href={href} passHref>
      <Styled.a>{children}</Styled.a>
    </Link>
  ),
}

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider components={components} theme={theme}>
        <ColorMode />
        <Styled.root>
          <Component {...pageProps} />
        </Styled.root>
      </ThemeProvider>
    )
  }
}

export default MyApp
