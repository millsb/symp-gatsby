import React from 'react'
import { graphql } from 'gatsby'
import {InnerContainer} from '../components/common';
import "../queries/eventFragments";

import Layout from '../components/layout'
import RichText from '../components/RichText';

const EventPage = ({ data }) => {
  const event = data.sc.event;
  return (
    <Layout>
      <InnerContainer noflex css={`padding-top: 3rem; padding-right: 30%; `}>
        <h1>{event.title.rendered}</h1>
        <article>
          <RichText body={event.description.rendered}/>
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
