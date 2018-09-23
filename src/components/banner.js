import React from 'react';
import ReactRotatingText from 'react-rotating-text';
import styled  from 'react-emotion';
import { COLORS } from './common';
import * as PropTypes from 'prop-types';
import './banner.scss';

const BannerText = styled('div')`
  color: ${COLORS.yellow.string()};
  font-weight: 600;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.6rem;
  line-height: 1;
  text-shadow: 1px 1px 1px #000;
`;


function Banner(props) {
  let { image, phrases, topText, bottomText } = props;
  const dotPhrases = phrases.map(p => `${p}.`);
  return (
    <figure css={`position: relative; margin-bottom: 0;`}>
      <img css={`margin-bottom: 0`} srcSet={image.fluid.srcSet} alt="banner" />
      <figcaption css={`width: 100%`}>
        <BannerText>
          <p>{topText}&nbsp;<ReactRotatingText style={{color: COLORS.awesome, fontSize: '3rem'}} items={dotPhrases} /></p>
          <p css={`font-size: 1.8rem; color: #fff; line-height: 1.2;`}>{bottomText}</p>
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
