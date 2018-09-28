import React from 'react'
import { graphql } from 'gatsby'
import {InnerContainer} from '../components/common';
import RichText from '../components/RichText';
import "../queries/eventFragments";

import Layout from '../components/Layout'

const InteriorPage = ({ data }) => {
  const page = data.sc.page;
  console.log("page", page);
  return (
    <Layout>
      <InnerContainer css={`padding-top: 3rem; padding-right: 30%`} noflex>
        <h1>{page.heading.rendered}</h1>
        <RichText body={page.body.rendered}/>
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
