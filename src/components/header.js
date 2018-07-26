import React from 'react';
import { Link } from 'gatsby';

const Header = ({ siteTitle, navItems }) => (
  <div
    style={{
      background: 'rebeccapurple',
      marginBottom: '1.45rem',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
      }}
    >
      <h1 style={{ margin: 0, float: 'left' }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <nav>
        {console.log(navItems)}
        {navItems &&
          navItems.map(item => (
            <Link
              to={`/${item.node.shortTitle.value}`}
              style={{
                marginLeft: '16px',
                color: 'white',
                textDecoration: 'none',
                fontSize: '18px',
                fontWeight: '700',
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
              }}
            >
              {item.node.shortTitle.value}
            </Link>
          ))}
      </nav>
    </div>
  </div>
);

export default Header;
