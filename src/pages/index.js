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
import { nvListToObj } from "../util";
import "../queries/eventFragments";
import "../queries/bannerFragments";
import "../queries/iconDashboardFragments";

const IndexPage = ({ data }) => {
  console.log(data);
  const bannerImage = data.bannerImage;
  const introText = data.sc.introText.introText;
  const events = data.sc.events.children;
  const banner = data.sc.banner;
  const testimonial = data.sc.testimonial;
  const iconDashboard = data.sc.iconDashboard;
  const iconBlocks = [
    iconDashboard.blockOne.values,
    iconDashboard.blockTwo.values,
    iconDashboard.blockThree.values,
    iconDashboard.blockFour.values
  ].map(nvListToObj);


  return (
    <Layout>
      <Banner
        image={bannerImage}
        topText={banner.topText.rendered}
        bottomText={banner.bottomText.rendered}
        phrases={banner.phrases.values.map( val => val.name )}
      />
      <InnerContainer>
        <IntroText>
          {introText.rendered}
        </IntroText>
      </InnerContainer>
      <IconDashboard blocks={iconBlocks} />
      <UpcomingEvents events={events} />
      <InnerContainer>
        <Testimonial attribution={testimonial.attribution.rendered} text={testimonial.text.rendered}/>
      </InnerContainer>
      <InnerContainer css={`background-color: ${COLORS.lapis.string()}; margin-bottom: 2rem;`}>
        <Footer/>
      </InnerContainer>
    </Layout>
  );
};

export const query = graphql`
    query HomepageQuery {
      sc {
        introText: item(path: "/sitecore/content/components/home/intro text") {
          ...on sc_IntroText {
            introText {
              rendered
            }
          }
        }
        events: item(path: "/sitecore/content/home/events") {
          children {
            ...EventFields
          }
        }
        banner: item(path: "/sitecore/content/components/home/home banner") {
          ...BannerFields
        }
        iconDashboard: item(path: "/sitecore/content/components/home/home icon dashboard") {
          ...IconDashboardFields
        }
        testimonial: item(path: "/sitecore/content/components/home/home testimonial") {
          ...on sc_Testimonial {
            text {
              rendered
            }
            attribution {
              rendered
            }
          }
        }
      }
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
