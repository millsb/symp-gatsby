import styled from 'react-emotion';
import * as R from 'ramda';
import Color from 'color';

export const nodesFromEdges = edges => R.map(R.identity);
export const datumProp = (prop, data) =>
  R.prop('node', R.head(dataProp(prop, data)));
export const dataProp = (prop, data) =>
  R.map(R.identity, R.prop(prop, data).edges);

export const InnerContainer = styled("div")`
      display: ${(props) => props.noflex ? "block" : "flex"};
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;
`;

export const IntroText = styled("p")`
  padding: 2rem 2rem;
  font-size: 1.4rem;
  line-height: 1.6;
`;

export const COLORS = {
  lapis: Color('#247ba0'),
  green: Color('#70c1b3'),
  seafoam: Color('#b2dbbf'),
  yellow: Color('#f3ffbd'),
  awesome: Color('#ff1654'),
  black: Color('#0a0a0c'),
};
