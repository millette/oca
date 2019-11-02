// npm
import Document, { Html, Head, Main, NextScript } from "next/document"
import { InitializeColorMode } from "theme-ui"

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <InitializeColorMode />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
