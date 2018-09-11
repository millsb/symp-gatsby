import React from "react";
import styled from "react-emotion";

export default ({text, attribution}) => {
  const Quote = styled("blockquote")`
    padding: 4rem 0;
    width: 60%;
    margin: 0 auto;
    
    p {
      font-size: 1.2rem;
      font-family: Vollkorn, serif;
      font-weight: 400;
      line-height: 1.4;
      font-style: italic;
    }
    
    footer {
      text-align: right;
    }
  `
  return (
    <Quote>
      <p>{text}</p>
      <footer>- {attribution}</footer>
    </Quote>
  )
}