import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'

const LandingPage = ({ data }) => (
  <Layout>
    <h1>{data.page.title.value}</h1>
  </Layout>
)

export default LandingPage;

// export const query = graphql`
//   query getLandingPage($shortTitle: String!) {
//     page: landingPage(shortTitle: { value: { eq: $shortTitle } }) {
//       title {
//         value
//       }
//     }
//   }
// `
