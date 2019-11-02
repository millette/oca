/** @jsx jsx */

// npm
import App from "next/app"
import Router from "next/router"
import Head from "next/head"
import NProgress from "nprogress"
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
import { future as theme } from "@theme-ui/presets"

if (!theme.breakpoints) theme.breakpoints = ["40em", "56em", "64em"]

if (!theme.styles.header) theme.styles.header = {}
theme.styles.header.display = "block"

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})
Router.events.on("routeChangeComplete", () => NProgress.done())
Router.events.on("routeChangeError", () => NProgress.done())

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
        <Head>
          <link rel="stylesheet" type="text/css" href="/nprogress.css" />
        </Head>
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
