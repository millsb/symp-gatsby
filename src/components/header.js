import React from 'react';
import { Link } from 'gatsby';
import { COLORS, InnerContainer } from './common';
import styled from 'react-emotion';
import PropTypes from "prop-types";

const TitleArea = styled("h1")`
  font-size: 1.85rem;
  margin-bottom: 0;
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
      box-shadow: 1px 1px 1px #333;
      border-bottom: 2px solid ${COLORS.green.string()};
      padding: .75rem 0;
      color: ${COLORS.awesome.string()};
      display: flex;
      justify-content: space-between;
    `}>

    <InnerContainer css={`justify-content: space-between; align-items: center`}>
      <TitleArea>
        {siteTitle}
      </TitleArea>
      <NavArea>
        {navItems.map( (item, i) => <NavLink key={i} to={item.path}>{item.label}</NavLink>)}
      </NavArea>
    </InnerContainer>
  </div>
);


const {string, shape, arrayOf } = PropTypes;
const navItemShape = shape({
  label: string.isRequired,
  path: string.isRequired
});

Header.propTypes = {
  siteTitle: string.isRequired,
  navItems: arrayOf(navItemShape).isRequired
};

export default Header;
