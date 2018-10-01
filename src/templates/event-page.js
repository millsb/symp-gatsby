import React from 'react'
import { graphql } from 'gatsby'
import {InnerContainer} from '../components/common';
import "../queries/eventFragments";

import Layout from '../components/Layout'
import RichText from '../components/RichText';
import MentorList from '../components/MentorList';

const EventPage = ({ data }) => {
  const event = data.sc.event;
  const mentors = event.mentors.targetItems;

  return (
    <Layout>
      <InnerContainer noflex css={`padding-top: 3rem;`}>
        <h1>{event.title.rendered}</h1>
        <h2><em>{event.summary.rendered}</em></h2>
          <article css={`max-width: 65%`}>
            <RichText body={event.description.rendered}/>
          </article>
          <MentorList people={mentors}/>
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
          summary {
            rendered
          }
          mentors {
            targetItems {
              ...on sc_Person {
                firstName {
                  rendered
                 }
                 lastName {
                   rendered
                 }
                headshot {
                  ...on sc_ImageField {
                    src
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
