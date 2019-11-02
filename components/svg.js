// npm
import { useState, useEffect } from "react"

const Svg = ({ k, svg }) => {
  const [__html, setA] = useState(svg || "")

  useEffect(() => {
    if (svg || !k) return
    fetch("/api/opt-one-key?key=computer/icons/flat-theme/action/clipart.svg")
      .then((res) => res.text())
      .then(setA)
  }, [])

  return <div dangerouslySetInnerHTML={{ __html }} />
}

export default Svg
