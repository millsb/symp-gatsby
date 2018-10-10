import React from 'react';
import ReactRotatingText from 'react-rotating-text';
import styled  from 'react-emotion';
import { COLORS } from './common';
import * as PropTypes from 'prop-types';
import './banner.scss';

const BannerText = styled('div')`
  font-weight: 600;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.6rem;
  line-height: 1;
  text-shadow: 1px 1px 1px #000;
  
  p:first-child {
    color: ${COLORS.yellow.string()};
  }
  
  p:nth-child(2) {
    font-size: 1.8rem; 
    color: #fff; 
    line-height: 1.2;
  }
  
  @media(max-width: 980px) {
    font-size: 1.6rem;
    width: 90%;
    
    p:nth-child(2) {
      font-size: 1rem;
      margin-bottom: 0;
      color: #fff;
    }
  }
  
  @media(max-width: 680px) {
    p:first-child {
      font-size: 0.75rem;
      display: none;
    }
  }
`;


function Banner(props) {
  let { image, phrases, topText, bottomText } = props;
  const dotPhrases = phrases.map(p => `${p}.`);
  return (
    <figure css={`position: relative; margin-bottom: 0;`}>
      <img css={`margin-bottom: 0`} src="/banner.jpg" alt="banner" />
      <figcaption css={`width: 100%`}>
        <BannerText>
          <p>{topText}&nbsp;<ReactRotatingText style={{color: COLORS.awesome, fontSize: '3rem'}} items={dotPhrases} /></p>
          <p>{bottomText}</p>
        </BannerText>
      </figcaption>
    </figure>
  );
}

Banner.propTypes = {
  image: PropTypes.any,
  phrases: PropTypes.any,
};

export default Banner;
