import React from 'react';
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

import background from '../images/background-header.png';

import { Navigation } from './Navigation';
import { MobileNavigation } from './MobileNavigation';
import { ContactInformation } from './ContactInformation';

export const Header = ({ props }) => {

    const { pathname } = props; // pulled from Layout.js

    const data = useStaticQuery(graphql`
        query {
            contentfulHeader {
                logo {
                    gatsbyImageData(placeholder: BLURRED)
                }
                description
            }
        }
    `);
    
    const { logo, description } = data.contentfulHeader;

    const logoImage = logo.gatsbyImageData;

    return (
        <StyledHeader>
            <SkipLink href="#skip">Skip to main content</SkipLink>
            <MainHeader>
                <MobileNavigation />
                <FlexBox>
                    <ImageHeader>
                        <Link to="/">
                            <Logo image={logoImage} alt="Genuine Builders Limited" />
                        </Link>
                    </ImageHeader>
                    <ContactContainer>
                        <ContactHeader>{description}</ContactHeader>
                        <InnerFlexBox>
                            <ContactInformation />
                        </InnerFlexBox>
                    </ContactContainer>
                </FlexBox>
            </MainHeader>
            <Navigation />
            <ContactUs visible={!pathname.includes("/contact") ? true : false}>
                <Link to="/contact">
                    <StaticImage src='../images/contact-us-tab.png' alt="Go to Contact page" />
                </Link>
            </ContactUs>
        </StyledHeader>
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

const StyledHeader = styled.header`
    border-top: 15px solid #2a3035;
    text-align: center;
    z-index: 3;

    @media only screen and (max-width: 768px) {
        border-top: none;
    };
`;

const MainHeader = styled.div`
    background-color: #38454c;
    background-image: url(${background});
    padding: 0.5em;

    @media only screen and (max-width: 560px) {
        padding-top: 4em;
    };

    @media only screen and (max-width: 414px) {
        display: flex;
    };
`;

const FlexBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    max-width: 920px;

    @media only screen and (max-width: 768px) {
        flex-flow: wrap;
    };

    @media only screen and (max-width: 414px) {
        justify-content: center;
    };
`;

const ImageHeader = styled.h1`
    margin: auto;
    margin-right: 1em;
    padding-bottom: 0.25em;

    @media only screen and (max-width: 768px) {
        margin: auto;
    };

    @media only screen and (max-width: 560px) {
        width: 100%;
        margin-left: 0;
        text-align: left;
    };

    @media only screen and (max-width: 414px) {
        text-align: center;
    };
`;

const Logo = styled(GatsbyImage)`
    width: 100%;
    max-width: 300px;
    height: auto;

    @media only screen and (max-width: 414px) {
        max-width: 75%;
    };
`;

const ContactContainer = styled.div`
    display: inline-block;
    color: #a0df6d;
    margin: 2em auto;

    @media only screen and (max-width: 560px) {
        margin: 1em 0em;
    };
`;

const ContactHeader = styled.h2`
    margin: 0;

    @media only screen and (max-width: 560px) {
        display: none;
    };
`;

const InnerFlexBox = styled(FlexBox)`
    margin-bottom: 0.5em;

    @media only screen and (max-width: 768px) {
        flex-flow: nowrap;
    };
`;

const ContactUs = styled.div`
    display: ${props => props.visible ? "block" : "none"};
    position: fixed;
    top: 16em;
    left: -1em;
    transition: left 0.5s ease;

    &:hover {
        left: 0;
        transition: left 0.5s ease;
    };
    
    @media only screen and (max-width: 768px) {
        display: none;
    };
`;
