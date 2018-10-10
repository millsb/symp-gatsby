import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import { COLORS, InnerContainer } from './common';
import Header from './Header';
import Footer from './Footer';
import './layout.scss';

const Layout = ({ children, data }) => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        siteHeader {
          title
          links {
            url
            text
          }
        }
        siteFooter {
          descriptionText
          descriptionTitle
          informationTitle
          informationLinks {
            url
            text
          }
          newsletterTitle
          newsletterButtonText
        }
      }
    `}
    render={data => {
      return (
        <div  css={`min-height: 100%;`}>
          <Helmet
            title={data.siteHeader.title}
            meta={[
              { name: 'description', content: 'Sample' },
              { name: 'keywords', content: 'sample, something' },
            ]}
          >
            <link
              href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans:400,600,700;Vollkorn:400"
              rel="stylesheet"
            />
          </Helmet>
          <Header
            siteTitle={data.siteHeader.title}
            navItems={data.siteHeader.links}
          />
          <div>{children}</div>
          <InnerContainer
            css={`
              grid-row-start: 2;
              grid-row-end: 3;
              background-color: ${COLORS.lapis.string()};
              margin-bottom: 2rem;
            `}
          >
            <Footer {...data.siteFooter} />
          </InnerContainer>
        </div>
      );
    }}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
