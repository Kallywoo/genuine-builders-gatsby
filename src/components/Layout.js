import React from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { createGlobalStyle } from 'styled-components';

import background from '../images/temp/brickBackground.png';

export const Layout = ({ children, location }) => {
    return (
        <>
            <GlobalStyle/>
            <Header props={location}/>
            {children}
            <Footer/>
        </>
    )
};

const GlobalStyle = createGlobalStyle`

  * {
    box-sizing: border-box;
  }

  #gatsby-focus-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  body {
    margin: 0;
    background-color: #596266;
    background-image: url(${background});
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      
    @media only screen and (max-width: 768px) {
      border: 20px solid #2a3035;
    };

  }

  main {
    flex: 1;
  }

  p {
    color: #a0df6d;
  }
`;