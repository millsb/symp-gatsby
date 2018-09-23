import React from 'react';
import { graphql } from 'gatsby';
import Banner from '../components/banner';
import Layout from '../components/layout';
import IconDashboard from '../components/IconDashboard';
import UpcomingEvents from '../components/UpcomingEvents';
import Testimonial from '../components/Testimonial';
import { InnerContainer, IntroText } from '../components/common';
import { nvListToObj } from "../util";
import "../queries/eventFragments";
import "../queries/bannerFragments";
import "../queries/iconDashboardFragments";
import ManagedComponents from '../components/ManagedComponents';

const IndexPage = ({ data }) => {
  console.log(data);
  const managedIds = data.sc.managedComponents.components.targetItems.map( item => item.id);
  const bannerImage = data.bannerImage;
  const introText = data.sc.introText;
  const events = data.sc.events;
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
      <ManagedComponents ids={managedIds}>
        <Banner
          cid={banner.id}
          image={bannerImage}
          topText={banner.topText.rendered}
          bottomText={banner.bottomText.rendered}
          phrases={banner.phrases.values.map( val => val.name )}
        />
        <InnerContainer cid={introText.id}>
          <IntroText>
            {introText.introText.rendered}
          </IntroText>
        </InnerContainer>
        <IconDashboard cid={iconDashboard.id } blocks={iconBlocks} />
        <InnerContainer cid={testimonial.id}>
          <Testimonial attribution={testimonial.attribution.rendered} text={testimonial.text.rendered}/>
        </InnerContainer>
        <UpcomingEvents cid={events.id} events={events.events.targetItems} />
      </ManagedComponents>
    </Layout>
  );
};

export const query = graphql`
    query HomepageQuery {
      sc {
        managedComponents: item(path: "/sitecore/content/home") {
          ...on sc_HomePage {
            components {
              targetItems {
                id
              }
            }
          }
        }
        introText: item(path: "/sitecore/content/components/home/intro text") {
          id
          ...on sc_IntroText {
            introText {
              rendered
            }
          }
        }
        events: item(path: "/sitecore/content/components/home/upcoming events") {
          ...on sc_UpcomingEvents {
            id
            events {
              targetItems {
                ...on sc_EventPage {
                  ...EventFields
                }
              }
            }
          }
        }
        banner: item(path: "/sitecore/content/components/home/home banner") {
          ...BannerFields
        }
        iconDashboard: item(path: "/sitecore/content/components/home/home icon dashboard") {
          ...IconDashboardFields
        }
        testimonial: item(path: "/sitecore/content/components/home/home testimonial") {
          id
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
