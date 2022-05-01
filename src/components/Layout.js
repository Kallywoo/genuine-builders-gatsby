import React from 'react';
import { createGlobalStyle } from 'styled-components';

import { Footer } from './Footer';
import { Header } from './Header';

import background from '../images/background-main.jpg';

export const Layout = ({ children, location }) => {
    return (
        <>
            <GlobalStyle />
            <Header props={location} />
            <div id="skip">{children}</div>
            <Footer />
        </>
    );
};

const GlobalStyle = createGlobalStyle`

    * {
        box-sizing: border-box;
    };

    html {
        scroll-behavior: smooth; // mainly used for comparisons in gallery

        @media only screen and (max-width: 560px) {
            scroll-padding-top: 66px; // stops mobile header blocking top of targeted elements
        };
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

        @media only screen and (max-width: 414px) {
            border: none;
            border-top: 20px solid #2a3035;
        };
    };

    #skip {
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
