import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import { ContactInformation } from './ContactInformation';

import background from '../images/temp/headerBackground.png';
import logo from '../images/temp/logo.png';
import federation from '../images/temp/federation.svg';

export const Footer = () => {

    const data = useStaticQuery(graphql`
        query { 
            allContentfulContact {
                contacts: nodes {
                    id
                    name
                    number
                    email
                    listOrder
                }
            }
        }
    `);

    const { contacts } = data.allContentfulContact;
    contacts.sort((a, b) => a.listOrder - b.listOrder);

    return (
        <StyledFooter>
            <LeftSideContent>
                <LogoContainer>
                    <Logo src={logo} alt=""/>
                </LogoContainer>
                <Navigation>
                    <List>
                        <ListItem><StyledLink to="/">Home</StyledLink></ListItem>
                        <ListItem><StyledLink to="/about">About Us</StyledLink></ListItem>
                        <ListItem><StyledLink to="/gallery">Gallery</StyledLink></ListItem>
                        <ListItem><StyledLink to="/contact">Contact</StyledLink></ListItem>
                    </List>
                </Navigation>
            </LeftSideContent>
            <RightSideContent>
                <ContactContainer>
                    <ContactInformation/>
                </ContactContainer>
                <CompanyInfo>
                    <CompanyNumber>Company Number: 6286458</CompanyNumber>
                    <a href="https://www.fmb.org.uk/builder/genuine-builders-ltd.html">
                        <Image src={federation} alt="Federation of Master Builders"/>
                    </a>
                </CompanyInfo>
            </RightSideContent>
        </StyledFooter>
    )
};

const StyledFooter = styled.footer`
    background-color: #38454c;
    background-image: url(${background});
    border-top: 15px solid #2a3035;
    padding: 2em;
    display: flex;
    justify-content: space-between;
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
    }
`;

const Logo = styled.img`
    display: block;
    width: 100%;
    max-width: 330px;
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
    }
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
    }
`;

const ContactContainer = styled.div`
    display: flex;
    text-align: center;
    color: #a0df6d;
    margin-left: 2em;
    margin-bottom: 1em;
    @media only screen and (max-width: 768px) {
        display: none;
    }
`;

const CompanyInfo = styled.div`
    display: flex;
    align-items: center;
`;

const CompanyNumber = styled.p`
    color: white;
    margin-right: 1em;
`;

const Image = styled.img`
    display: block;
    width: 60px;
`;