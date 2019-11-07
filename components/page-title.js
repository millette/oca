// npm
import { NextSeo } from "next-seo"

const PageTitle = ({ children }) => (
  <NextSeo
    title={children}
    openGraph={{ title: `${children} - OpenClipArts Explorer` }}
  />
)

export default PageTitle
