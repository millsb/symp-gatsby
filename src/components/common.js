import styled from 'react-emotion';
import * as R from 'ramda';
import Color from 'color';

export const nodesFromEdges = edges => R.map(R.identity);
export const datumProp = (prop, data) =>
  R.prop('node', R.head(dataProp(prop, data)));
export const dataProp = (prop, data) =>
  R.map(R.identity, R.prop(prop, data).edges);

export const COLORS = {
  lapis: Color('#247ba0'),
  green: Color('#70c1b3'),
  seafoam: Color('#b2dbbf'),
  yellow: Color('#f3ffbd'),
  awesome: Color('#ff1654'),
  black: Color('#0a0a0c'),
};

export const InnerContainer = styled("div")`
    display: ${(props) => props.noflex ? "block" : "flex"};
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;
    
    @media(max-width: 680px) {
      flex-direction: column;
    }
`;

export const IntroText = styled("p")`
  padding: 2rem 2rem;
  font-size: 1.4rem;
  line-height: 1.6;
`;

export const Heading = styled('h2')`
  width: 100%;
  color: ${COLORS.black.string()};
  font-size: 1.4rem;
  font-weight: 700;
  text-align: ${(props) => props.align ? props.align : "center"};
  
  span {
  font-weight: 400;
  font-size: 1.2rem;
`;

export const BasicButton = styled('button')`
    background-color: ${COLORS.awesome.string()};
    display: block;
    padding: 0.6rem 0.8rem;
    font-size: 0.9rem;
    width: 40%;
    margin: 0 auto;
    color: #fff;
    text-decoration: none;
    text-transform: uppercase;
    text-align: center;
    font-weight: 700;
    transition: background-color 0.2s ease-out;
    border: 0;

    &:hover {
      background-color: ${COLORS.lapis.string()};
    }
`;

