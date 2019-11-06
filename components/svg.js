// npm
import { useState, useEffect } from "react"

const Svg = ({ style, k, svg }) => {
  const [content, setA] = useState(svg || "")

  useEffect(() => {
    if (svg || !k) return
    fetch(`/api/opt-one-key?key=${k}`)
      .then((res) => res.text())
      .then(setA)
  }, [])

  return (
    <div
      style={style}
      dangerouslySetInnerHTML={{ __html: content || "Loading..." }}
    />
  )
}

export default Svg
