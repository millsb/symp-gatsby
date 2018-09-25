import React from 'react'
import { graphql } from 'gatsby'
import {InnerContainer} from '../components/common';
import "../queries/eventFragments";

import Layout from '../components/layout'

const InteriorPage = ({ data }) => {
  const page = data.sc.page;
  console.log("page", page);
  return (
    <Layout>
      <InnerContainer noflex>
        <h1>{page.heading.rendered}</h1>
        <article dangerouslySetInnerHTML={{__html: page.body.rendered}}/>
      </InnerContainer>
    </Layout>
  )
};

export default InteriorPage;

export const query = graphql`
  query GetPage($id: String!) {
    sc {
      page: item(path: $id) {
        ...on sc_InteriorPage {
          heading {
            rendered
          }
          body {
            rendered
          }
        }
      }
    }
  }
`;
