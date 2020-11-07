import { graphql } from "gatsby"
import React from "react"

export default ({ pageContext }) => {
  
  return (
    <div>
      This is dynamic page with gatsby {pageContext}
    </div>
  )
}

