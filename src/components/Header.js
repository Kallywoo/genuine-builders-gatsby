import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import background from '../images/temp/headerBackground.png';
import logo from '../images/temp/logo.png';
import square from '../images/temp/square.png';
import contactTab from '../images/temp/contactTab.png';

import { Navigation } from './Navigation';
import { MobileNavigation } from './MobileNavigation';

export const Header = ({ props }) => {

    const { pathname } = props; // pulled from Layout.js
    
    return (
        <StyledHeader>
            <MainHeader>
                <MobileNavigation/>
                <FlexBox>
                    <LogoLink to="/"><Logo src={logo} alt="Genuine Builders Limited"/></LogoLink>
                    <ContactContainer>
                        <ContactHeader>For all your building requirements</ContactHeader>
                        <InnerFlexBox>
                            <Square src={square} alt=""/>
                            <Grid>
                                <Name>Mat <NameSpan>Lynch</NameSpan></Name>
                                <Number href="tel:07769-708-388">07769 708 388</Number>
                                <Email href="email:mat@genuinebuilders.co.uk">mat@genuinebuilders.co.uk</Email>
                                <Name>Office</Name>
                                <Number href="tel:01904-708-121">01904 708 121</Number>
                            </Grid>
                            <Square src={square} alt=""/>
                        </InnerFlexBox>
                    </ContactContainer>
                </FlexBox>
            </MainHeader>
            <Navigation/>
            <ContactUs visible={pathname !== "/contact" ? true : false}>
                <Link to="/contact">
                    <ContactTab src={contactTab} alt="Contact Us"/>
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

const LogoLink = styled.a`
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

const Square = styled.img`
    width: 2em;
    vertical-align: middle;
    @media only screen and (max-width: 560px) {
        display: none;
    }
`;

const Grid = styled.div`
    display: inline-grid;
    grid-template-columns: auto;
    grid-gap: 0.25em 3em;
    text-align: left;
    vertical-align: middle;
    margin: 0em 0.75em;
    font-size: small;
    @media only screen and (max-width: 560px) {
        grid-gap: 0.25em 1em;
    }
`;

const Name = styled.p`
    margin: 0;
    grid-column: 1;
    white-space: nowrap;
    @media only screen and (max-width: 560px) {
        color: #52af07;
        text-transform: uppercase;
    }
`;

const NameSpan = styled.span`
    @media only screen and (max-width: 560px) {
        display: none;
    }
`;

const Number = styled.a`
    white-space: nowrap;
    text-decoration: none;
    color: #aeca97;
    grid-column: 2;
    @media only screen and (max-width: 560px) {
        color: #8cde97;
    }
`;

const Email = styled.a`
    white-space: nowrap;
    text-decoration: none;
    color: white;
    grid-column: 3;
    @media only screen and (max-width: 560px) {
        order: 3;
        grid-column: span 3;
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