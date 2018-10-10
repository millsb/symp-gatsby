import React from 'react';
import styled from 'react-emotion';
import { COLORS, BasicButton } from './common';

export default ({
  descriptionTitle,
  descriptionText,
  informationTitle,
  informationLinks,
  newsletterTitle,
  newsletterButtonText
}) => {
  const Footer = styled('footer')`
    padding: 2rem;
    padding-top: 4rem;
    display: flex;
    box-shadow: 4px 4px 4px #333, 16px -16px 0px ${COLORS.green.string()},
      -16px 16px 0px ${COLORS.seafoam.string()};

    h5 {
      color: ${COLORS.yellow.string()};
      margin-bottom: 0.6rem;
      text-transform: uppercase;
      font-size: 0.75rem;
    }

    aside {
      border-right: 1px solid
        ${COLORS.lapis
          .lighten(0.5)
          .rgb()
          .string()};
      padding-right: 3rem;
      margin-right: 3rem;
    }

    aside:first-child {
      width: 40%;
    }

    aside:nth-child(2) {
      width: 20%;
    }

    aside:last-child {
      width: 40%;
    }

    aside:last-child {
      border-right: 0;
      padding-right: 0;
    }

    p {
      color: #fff;
      font-size: 0.8rem;
      line-height: 1.4;
      margin-bottom: 0.4rem;
    }

    a {
      color: #fff;
    }

    input {
      padding: 0.3rem 0.1rem;
    }
  `;
  return (
    <Footer>
      <aside>
        <h5>{descriptionTitle}</h5>
        <p>{descriptionText}</p>
      </aside>
      <aside>
        <h5>{informationTitle}</h5>
        <React.Fragment>
          {informationLinks.map( (link, i) => <p key={i}><a href={link.url}>{link.text}</a></p>)}
        </React.Fragment>
      </aside>
      <aside>
        <h5>{newsletterTitle}</h5>
        <form
          css={`
            display: flex;
          `}
        >
          <input type="text" />
          <BasicButton
            css={`
              font-size: 0.8rem;
            `}
          >
          {newsletterButtonText}
          </BasicButton>
        </form>
      </aside>
    </Footer>
  );
};
