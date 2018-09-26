import React from "react";
import styled from "react-emotion";

const RichText = ({body}) => {
  const Wrapper = styled('div')`
    margin-bottom: 3rem;
    line-height: 1.8;
    
    p {
      margin-bottom: 1.6rem;
    }
  `;

  return (
    <Wrapper dangerouslySetInnerHTML={{__html: body}} />
  )

};

export default RichText;