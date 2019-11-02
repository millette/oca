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

// self
import Sample from "../components/sample"
import Svg from "../components/svg"
import FooterMdx from "../components/footer.mdx"
import HeaderMdx from "../components/header.mdx"

if (!theme.breakpoints) theme.breakpoints = ["40em", "56em", "64em"]

if (!theme.styles.header) theme.styles.header = {}
theme.styles.header.display = "block"

const nStart = () => NProgress.start()
const nDone = () => NProgress.done()
Router.events.on("routeChangeStart", nStart)
Router.events.on("routeChangeComplete", nDone)
Router.events.on("routeChangeError", nDone)

const components = {
  Sample,
  Svg,
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
                <HeaderMdx />
              </Container>
            </Header>
            <Main>
              <Container>
                <Component {...pageProps} />
              </Container>
            </Main>
            <Footer>
              <Container>
                <FooterMdx />
              </Container>
            </Footer>
          </Layout>
        </Styled.root>
      </ThemeProvider>
    )
  }
}

export default MyApp
