import React from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import styled, { createGlobalStyle } from 'styled-components';

import background from '../images/temp/brickBackground.png';

export const Layout = ({ children, location }) => {
  return (
    <>
      <GlobalStyle/>
      <SkipLink href="#skip">Skip to main content</SkipLink>
      <Header props={location}/>
      <SkipContent id="skip" tabIndex="-1">Main Content</SkipContent>
      {children}
      <Footer/>
    </>
  );
};

const SkipLink = styled.a`
  position: absolute;
  top: -1000%;

  &:focus {
    top: 0;
    left: 33%;
    right: 33%;
    background-color: #65717a;
    color: #a0df6d;
    padding: 0.5em 2em;
    text-align: center;
    text-decoration: none;
    box-shadow: 3px 3px 3px #333333;
    border-radius: 3px;
    z-index: 4;

    @media only screen and (max-width: 560px) {
      background-color: #1f2327;
      color: white;
      box-shadow: none;
    };
  };
`;

const SkipContent = styled.h2`
  position: absolute;
  top: -1000%;
`;

const GlobalStyle = createGlobalStyle`

  * {
    box-sizing: border-box;
  };

  #gatsby-focus-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  };
  
  body {
    margin: 0;
    background-color: #596266;
    background-image: url(${background});
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      
    @media only screen and (max-width: 768px) {
      border: 20px solid #2a3035;
    };

  };

  main {
    flex: 1;
  };

  p {
    color: #a0df6d;
  };

  ::-webkit-scrollbar {
    width: 15px;
  };

  ::-webkit-scrollbar-track {
    background: #1f2327;
  };

  ::-webkit-scrollbar-thumb {
    background: #78b349;
    border-left: 3px solid #1f2327;
    border-right: 3px solid #1f2327;
  };

  ::-webkit-scrollbar-thumb:hover {
    background: #4c781d;
  };
`;