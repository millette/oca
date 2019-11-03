/** @jsx jsx */

// npm
import App from "next/app"
import Link from "next/link"
import Router from "next/router"
import Head from "next/head"
import NProgress from "nprogress"
import {
  jsx,
  Layout,
  Styled,
  ColorMode,
  Header,
  Main,
  Container,
  Footer,
  Flex,
  Box,
  ThemeProvider,
} from "theme-ui"
import { future as theme } from "@theme-ui/presets"

// self
import Sample from "../components/sample"
import Svg from "../components/svg"
import Nav from "../components/nav"
import FooterMdx from "../components/footer.mdx"
import HeaderMdx from "../components/header.mdx"
import ExternalLink from "../components/external-link"

if (!theme.breakpoints) theme.breakpoints = ["40em", "56em", "64em"]

if (!theme.styles.header) theme.styles.header = {}
theme.styles.header.display = "block"

let routeTimer

const nStart = () => {
  NProgress.start()
  const $svg = document.querySelector("header svg")
  // FIXME: Use request animation frame.....
  routeTimer = setInterval(() => {
    const n = Math.round((360 * (Date.now() % 700)) / 750)
    $svg.style.transform = `rotate(${n}deg)`
  }, 17)
}

const nDone = () => {
  NProgress.done()
  clearInterval(routeTimer)
}

Router.events.on("routeChangeStart", nStart)
Router.events.on("routeChangeComplete", nDone)
Router.events.on("routeChangeError", nDone)

const absoluteRe = /^https{0,1}:\/\//

const isAbsolute = absoluteRe.test.bind(absoluteRe)

const components = {
  Sample,
  Svg,
  Nav,
  Flex,
  Box,
  a: ({ href, children }) =>
    isAbsolute(href) ? (
      <ExternalLink href={href}>{children}</ExternalLink>
    ) : (
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
        {/* FIXME: move to theme itself or mdxProvider components */}
        <style jsx global>
          {"summary > * { display: inline; }"}
        </style>
      </ThemeProvider>
    )
  }
}

export default MyApp
