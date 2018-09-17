import React from 'react'
import { Link, graphql } from 'gatsby'
import {InnerContainer} from '../components/common';

import Layout from '../components/layout'

const EventPage = ({ data }) => {
  const event = data.event;
  return (
    <Layout>
      <InnerContainer noflex>
        <h1>{event.title.rendered}</h1>
        <article>
          <p>{event.description.rendered}</p>
        </article>
      </InnerContainer>
    </Layout>
  )
};

export default EventPage;

export const query = graphql`
  query GetEvent($id: String!) {
    event(id: { eq: $id }) {
      title {
        rendered
      }
      description {
        rendered
      }
    }
  }
`;
