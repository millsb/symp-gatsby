import React from 'react';
import styled from 'react-emotion';
import {InnerContainer, Heading } from './common';
import PlaceIcon from '@material-ui/icons/PlaceTwoTone';
import FaceIcon from '@material-ui/icons/FaceTwoTone';
import SchoolIcon from '@material-ui/icons/SchoolTwoTone';
import LaptopMacIcon from '@material-ui/icons/LaptopMacTwoTone'
import {COLORS} from "./common";


const IconWrapper = styled('div')`
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  flex-basis: 50%;
`;

const IconBox = ({ icon, stat, text, color }) => {
  const iconMap = {
    "place": PlaceIcon,
    "face": FaceIcon,
    "school": SchoolIcon,
    "laptop": LaptopMacIcon
  };

  const IconTag = iconMap[icon] || PlaceIcon;

  const Wrapper = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    min-width: 25%;
    padding: 2rem 0;
    margin-bottom: 2rem;

    span {
      font-size: 1.6rem;
      font-weight: 700;
    }

    p {
      width: 100%;
      text-align: center;
      font-size: 1rem;
    }

    svg {
      height: 60px;
      width: 60px;
      margin-right: 0.8rem;
    }
  `;

  return (
    <Wrapper>
      <div
        css={`
              display: flex;
              align-items: center;
            `}
      >
        <IconTag nativeColor={COLORS[color].string()} />
        <span>{stat}</span>
      </div>
      <p>{text}</p>
    </Wrapper>
  );

};

const IconDashboard = ({ blocks }) => {
  return (
    <InnerContainer noflex>
      <Heading>AT A GLANCE</Heading>
      <IconWrapper>
        {blocks.map( (block, i) => <IconBox key={i} icon={block.icon} stat={block.stat} text={block.text} color={block.color}/> )}
      </IconWrapper>
    </InnerContainer>
  );
};

export default IconDashboard;
