import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

import background from '../images/temp/headerBackground.png';

import { Navigation } from './Navigation';
import { MobileNavigation } from './MobileNavigation';
import { ContactInformation } from './ContactInformation';

export const Header = ({ props }) => {

    const { pathname } = props; // pulled from Layout.js

    const data = useStaticQuery(graphql`
        query {
            contentfulHeader {
                logo {
                    fluid {
                        src
                    }
                }
                description
                contactImage {
                    fluid {
                        src
                    }
                }
            }
        }
    `);
    
    const { logo, description, contactImage } = data.contentfulHeader;

    const logoImage = logo.fluid.src;
    const contactTab = contactImage.fluid.src;

    return (
        <StyledHeader>
            <MainHeader>
                <MobileNavigation />
                <FlexBox>
                    <ImageHeader>
                        <Link to="/"><Logo src={logoImage} alt="Genuine Builders Limited" width="300" height="150" /></Link>
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
            <ContactUs visible={pathname !== "/contact" ? true : false}>
                <Link to="/contact">
                    <ContactTab src={contactTab} alt="Go to Contact page" />
                </Link>
            </ContactUs>
        </StyledHeader>
    );
};

const StyledHeader = styled.header`
    border-top: 15px solid #2a3035;
    text-align: center;
    z-index: 3;
    @media only screen and (max-width: 768px) {
        border-top: none;
    }
`;

const MainHeader = styled.div`
    background-color: #38454c;
    background-image: url(${background});
    padding: 0.5em;
    @media only screen and (max-width: 560px) {
        padding-top: 4em;
    }
`;

const FlexBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    max-width: 920px;
    @media only screen and (max-width: 768px) {
        flex-flow: wrap;
    }
`;

const ImageHeader = styled.h1`
    margin: auto;
    margin-right: 1em;
    @media only screen and (max-width: 768px) {
        margin: auto;
    }
    @media only screen and (max-width: 560px) {
        width: 100%;
        margin-left: 0;
        text-align: left;
    }
`;

const Logo = styled.img`
    width: 100%;
    max-width: 300px;
`;

const ContactContainer = styled.div`
    display: inline-block;
    color: #a0df6d;
    margin: 2em auto;
    @media only screen and (max-width: 560px) {
        margin: 1em 0em;
    }
`;

const ContactHeader = styled.h2`
    margin: 0;
    @media only screen and (max-width: 560px) {
        display: none;
    }
`;

const InnerFlexBox = styled(FlexBox)`
    margin-bottom: 0.5em;
    @media only screen and (max-width: 768px) {
        flex-flow: nowrap;
    }
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
    }
    @media only screen and (max-width: 768px) {
        display: none;
    }
`;

const ContactTab = styled.img`
    display: block;
`;
