import React from 'react'
import { Link, graphql } from 'gatsby'
import {InnerContainer} from '../components/common';
import "../queries/eventFragments";

import Layout from '../components/layout'

const EventPage = ({ data }) => {
  const event = data.sc.event;
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
    sc {
      event: item(path: $id) {
        ...on sc_EventPage {
          title {
            rendered
          }
          description {
            rendered
          }
        }
      }
    }
  }
`;
