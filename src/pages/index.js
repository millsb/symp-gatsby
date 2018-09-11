import React from 'react';
import { graphql } from 'gatsby';
import Banner from '../components/banner';
import Layout from '../components/layout';
import IconDashboard from '../components/IconDashboard';
import UpcomingEvents from '../components/UpcomingEvents';
import Testimonial from '../components/Testimonial';
import Footer from "../components/Footer";
import { InnerContainer, IntroText } from '../components/common';
import { COLORS } from '../components/common';

const IndexPage = ({ data }) => {
  const { bannerImage } = data;
  return (
    <Layout>
      <Banner
        image={bannerImage}
        topText={'Spend a weekend getting to know'}
        bottomText={
          'Join a local hackathon staffed by experienced experts on a range of technical topics.'
        }
        phrases={['Sitecore.', 'GraphQL.', 'React.', 'GatsbyJS.']}
      />
      <InnerContainer>
        <IntroText>
          GrokCamp is a non-profit group organizing hackathons and tech events
          across the globe to help further the education of working
          professionals, hobbyists, and youth. Hosted by volunteers who possess
          depth of experience on specific technologies, our mission is to build
          and foster a mentoring environment.
        </IntroText>
      </InnerContainer>
      <IconDashboard
        blocks={[
          {
            icon: 'face',
            stat: 102,
            text: 'Expert Mentors',
            color: COLORS.green.string(),
          },
          {
            icon: 'place',
            stat: 24,
            text: 'Cities Worldwide',
            color: COLORS.awesome.string(),
          },
          {
            icon: 'school',
            stat: 37,
            text: 'Technology Areas',
            color: COLORS.lapis.string(),
          },
          {
            icon: 'laptop',
            stat: 4,
            text: 'Startups Launched',
            color: COLORS.seafoam.string(),
          },
        ]}
      />
      <UpcomingEvents
        events={[
          {
            id: '1',
            date: 'Thu Aug 24',
            location: 'Philadelphia, PA',
            venue: 'Agency One, 1102 Market St.',
            title: 'Build React Apps Using GraphQL',
            slub: 'build-react-apps-using-graphql',
            summary:
              'Learn how to build a complete client side application with GraphQL.',
            tags: ['GraphQL', 'Javascript', 'React'],
            mentors: ['Bryan Mills', 'Carol Newberg'],
            description:
              "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
          },
          {
            id: '2',
            date: 'Thu Aug 24',
            location: 'Philadelphia, PA',
            venue: 'Drexel University, Building A Room 204.',
            title: 'Is This a Turtle? Machine Learning With Logo',
            slug: 'is-this-a-turtle-machine-learning-with-logo',
            summary:
              "What's better than a neural net? A neural net with a reptilian brain.",
            description:
              "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
            tags: ['ML', 'Logo', 'Turtles!'],
            mentors: ['Mike Jones'],
          },
        ]}
      />
      <InnerContainer>
        <Testimonial attribution={"Eva Wintrish, Developer at ETS Solutions"} text={"GrokCamp has been an invaluable resource in my own personal growth as a developer. Be it attending an educational session or a weekend hackathon, I'm able to learn and collaborate along with fellow engineers"}/>
      </InnerContainer>
      <InnerContainer css={`background-color: ${COLORS.lapis.string()}; margin-bottom: 2rem;`}>
        <Footer/>
      </InnerContainer>
    </Layout>
  );
};

export const query = graphql`
  query HomepageQuery {
    bannerImage: imageSharp(
      original: { src: { regex: "/stefan-stefancik-257625-unsplash/" } }
    ) {
      fluid(
        maxWidth: 1440
        maxHeight: 520
        duotone: { highlight: "#247ba0", shadow: "#0e0b16", opacity: 80 }
      ) {
        srcSet
      }
    }
  }
`;

export default IndexPage;
