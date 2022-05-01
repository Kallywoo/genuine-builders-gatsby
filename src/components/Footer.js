import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Link, useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import { ContactInformation } from './ContactInformation';

import background from '../images/background-header.jpg';
import federation from '../images/federation-logo.svg';

export const Footer = () => {

    const data = useStaticQuery(graphql`
        query { 
            contentfulHeader {
                logo {
                    gatsbyImageData(placeholder: BLURRED)
                }
            }
        }
    `);

    const { gatsbyImageData: logo } = data.contentfulHeader.logo;

    return (
        <StyledFooter>
            <LeftSideContent>
                <LogoContainer>
                    <Logo image={logo} alt="Genuine Builders Limited" />
                </LogoContainer>
                <Navigation>
                    <List>
                        <ListItem>
                            <StyledLink to="/">Home</StyledLink>
                        </ListItem>
                        <ListItem>
                            <StyledLink to="/about">About Us</StyledLink>
                        </ListItem>
                        <ListItem>
                            <StyledLink to="/gallery">Gallery</StyledLink>
                        </ListItem>
                        <ListItem>
                            <StyledLink to="/contact">Contact</StyledLink>
                        </ListItem>
                    </List>
                </Navigation>
            </LeftSideContent>
            <RightSideContent>
                <ContactContainer>
                    <ContactInformation />
                </ContactContainer>
                <CompanyInfo>
                    <CompanyNumber>Company Number: <Split>6286458</Split></CompanyNumber>
                    <a href="https://www.fmb.org.uk/builder/genuine-builders-ltd.html">
                        <Image src={federation} alt="Federation of Master Builders" width="60" height="94" />
                    </a>
                </CompanyInfo>
            </RightSideContent>
        </StyledFooter>
    );
};

const StyledFooter = styled.footer`
    background-color: #38454c;
    background-image: url(${background});
    border-top: 15px solid #2a3035;
    padding: 2em;
    display: flex;
    justify-content: space-between;

    @media only screen and (max-width: 414px) {
        border-top: 15px solid #1f2327;
    };
`;

const LeftSideContent = styled.div`
    display: flex;
`;

const LogoContainer = styled.div`
    display: inline-block;
    width: auto;
    margin-right: 4em;

    @media only screen and (max-width: 768px) {
        display: none;
    };
`;

const Logo = styled(GatsbyImage)`
    display: block;
    width: 100%;
    max-width: 330px;
    height: auto;
`;

const Navigation = styled.nav`
    display: inline-block;
`;

const List = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
`;

const ListItem = styled.li`
    margin-top: 1em;
    white-space: nowrap;

    &:nth-child(1) {
        margin-top: 0em;
    };
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #a8dc7e;
`;

const RightSideContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;

    @media only screen and (max-width: 768px) {
        justify-content: center;
    };
`;

const ContactContainer = styled.address`
    display: flex;
    text-align: center;
    color: #a0df6d;
    margin-left: 2em;
    margin-bottom: 1em;

    @media only screen and (max-width: 768px) {
        display: none;
    };
`;

const CompanyInfo = styled.div`
    display: flex;
    align-items: center;
`;

const CompanyNumber = styled.p`
    color: white;
    margin-right: 1em;

    @media only screen and (max-width: 560px) {
        text-align: right;
    };
`;

const Split = styled.span`
    @media only screen and (max-width: 560px) {
        display: block;
    };
`;

const Image = styled.img`
    display: block;
    width: 60px;
`;
