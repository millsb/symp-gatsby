import React from "react";
import styled from "react-emotion";
import {COLORS, BasicButton} from "./common";

export default () => {
  const Footer = styled("footer")`
    padding: 2rem;
    padding-top: 4rem;
    display: flex;
    box-shadow:
    16px -16px 0px ${COLORS.green.string()}, 
    -16px 16px 0px ${COLORS.seafoam.string()};
    
    h5 {
      color: ${COLORS.yellow.string()};
      margin-bottom: 0.6rem;
      text-transform: uppercase;
      font-size: 0.75rem;
    }
    
    aside {
      border-right: 1px solid ${COLORS.lapis.lighten(0.5).rgb().string()};
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
      padding: .3rem 0.1rem;
    }
    
  `;

  return (
    <Footer>
      <aside>
        <h5>Donate Today</h5>
        <p>GrokCamp is a non-profit organization that depends entirely on volunteers, grants and sponsorships. If you are interesting in giving or partnering with us, please see our <a href={"#"}> Donations</a> page. </p>
      </aside>
      <aside>
        <h5>Information</h5>
        <p><a href="#">Code of Conduct</a></p>
        <p><a href="#">Privacy Policy</a></p>
        <p><a href="#">Terms &amp; Conditions</a></p>
      </aside>
      <aside>
        <h5>Our Newsletter</h5>
        <form css={`display: flex;`}>
          <input type="text"/>
          <BasicButton css={`font-size: .8rem;`}>Sign Up</BasicButton>
        </form>
      </aside>
    </Footer>
  );
}