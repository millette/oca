/** @jsx jsx */

// npm
import App from "next/app"
import Link from "next/link"
import {
  jsx,
  Layout,
  ThemeProvider,
  Styled,
  ColorMode,
  Header,
  Main,
  Container,
  Footer,
} from "theme-ui"
import { roboto as theme } from "@theme-ui/presets"

theme.styles.header = {
  display: "block",
}

const components = {
  /*
  a: ({ children, href }) => (
    <Link href={href} passHref>
      <Styled.a>{children}</Styled.a>
    </Link>
  ),
  */
}

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider components={components} theme={theme}>
        <ColorMode />
        <Styled.root>
          <Layout>
            <Header>
              <Container>
                <Styled.h1>OpenClipArt</Styled.h1>
                <Styled.h2>A work in progress</Styled.h2>
              </Container>
            </Header>

            <Main>
              <Container>
                <Component {...pageProps} />
              </Container>
            </Main>
            <Footer>
              <Container>
                <Styled.p>Footer stuff</Styled.p>
              </Container>
            </Footer>
          </Layout>
        </Styled.root>
      </ThemeProvider>
    )
  }
}

export default MyApp
