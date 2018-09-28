import React from 'react';
import { Link } from 'gatsby';
import { COLORS, InnerContainer } from './common';
import styled from 'react-emotion';
import PropTypes from "prop-types";

const TitleArea = styled("h1")`
  font-size: 1.85rem;
  margin-bottom: 0;
  a {
    color: inherit;
    text-decoration: none;
  }
`;

const NavArea = styled("nav")`
  display: flex;
  justify-content: space-between;
`;

const NavLink = styled(Link)`
  color: ${COLORS.lapis.string()};
  font-weight: 700;
  text-decoration: none;
  margin-left: 1.2rem;
  margin-top: 4px;
  border-bottom: 2px solid transparent;
  &:hover { borderColor: ${COLORS.awesome.string()}; }
`;

const Header = ({ siteTitle, navItems }) => (
  <div
    css={`
      padding: .75rem 0;
      border-bottom: 2px solid ${COLORS.green.string()};
      color: ${COLORS.awesome.string()};
      display: flex;
      justify-content: space-between;
    `}>

    <InnerContainer css={`justify-content: space-between; align-items: center`}>
      <TitleArea>
        <a href="/">{siteTitle}</a>
      </TitleArea>
      <NavArea>
        {navItems.map( (item, i) => <NavLink key={i} to={item.url}>{item.text}</NavLink>)}
      </NavArea>
    </InnerContainer>
  </div>
);


const {string, shape, arrayOf } = PropTypes;
const navItemShape = shape({
  url: string.isRequired,
  text: string.isRequired
});

Header.propTypes = {
  siteTitle: string.isRequired,
  navItems: arrayOf(navItemShape).isRequired
};

export default Header;
