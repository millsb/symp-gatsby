import React from 'react'
import {graphql} from 'gatsby';
import Banner from "../components/banner";
import Layout from '../components/layout'
import IconDashboard from '../components/IconDashboard';
import {InnerContainer, IntroText} from '../components/common';
import {COLORS} from "../components/common";

const IndexPage = ({data}) => {
  const {bannerImage} = data;
  return (
    <Layout>
      <Banner image={bannerImage}
              topText={"Spend a weekend getting to know"}
              bottomText={"Join a local hackathon staffed by experienced experts on a range of technical topics."}
              phrases={["Sitecore.", "GraphQL.", "React.", "GatsbyJS."]}/>
      <InnerContainer>
        <IntroText>
          GrokCamp is a non-profit group organizing hackathons and tech events across the globe to help
          further the education of working professionals, hobbyists, and youth.
          Hosted by volunteers who possess depth of experience on specific technologies, our
          mission is to build and foster a mentoring environment.
        </IntroText>
      </InnerContainer>
      <IconDashboard blocks={[
        {icon: "face", stat: 102, text: "Expert Mentors", color: COLORS.green.string()},
        {icon: "place", stat: 24, text: "Cities Worldwide", color: COLORS.awesome.string()},
        {icon: "school", stat: 37, text: "Technology Areas", color: COLORS.lapis.string()},
        {icon: "laptop", stat: 4, text: "Startups Launched", color: COLORS.seafoam.string()}

      ]}/>
    </Layout>
  );
};

export const query = graphql`
query HomepageQuery {
	bannerImage: imageSharp(original: {src: {regex: "/stefan-stefancik-257625-unsplash/"}}) {
    fluid(maxWidth: 1440, maxHeight: 520, duotone: {highlight: "#247ba0", shadow: "#0e0b16", opacity: 80}) {
        srcSet
    }
  }
}
`;

export default IndexPage
