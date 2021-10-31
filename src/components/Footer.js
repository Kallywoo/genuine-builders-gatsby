import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import background from '../images/temp/headerBackground.png';
import logo from '../images/temp/logo.png';
import square from '../images/temp/square.png';
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
                    <Square src={square} alt=""/>
                    <Grid>
                        {contacts.slice(0, 2).map(contact => 
                            <React.Fragment key={contact.id}>
                                <Name>{contact.name}</Name>
                                <Number href={`tel:${contact.number}`}>{contact.number}</Number>
                                <Email href={`email:${contact.email}`}>{contact.email}</Email>
                            </React.Fragment>
                        )}
                    </Grid>
                    <Square src={square} alt=""/>
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

const Square = styled.img`
    width: 2em;
    vertical-align: middle;
    align-self: center;
`;

const Grid = styled.div`
    display: inline-grid;
    grid-template-columns: auto;
    grid-gap: 0.25em 3em;
    text-align: left;
    vertical-align: middle;
    margin: 0em 0.75em;
    font-size: small;
`;

const Name = styled.p`
    margin: 0;
    grid-column: 1;
    white-space: nowrap;
`;

const Number = styled.a`
    text-decoration: none;
    color: #aeca97;
    grid-column: 2;
    white-space: nowrap;
`;

const Email = styled.a`
    text-decoration: none;
    color: white;
    grid-column: 3;
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