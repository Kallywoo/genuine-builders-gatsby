import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';

import { ContactForm } from '../components/ContactForm';
import screw from '../images/temp/screwBulletSmall.png';
import SEO from '../components/SEO';

export const data = graphql`
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
`;

export default function Contact({ data }) {

    const { contacts } = data.allContentfulContact;
    contacts.sort((a, b) => a.listOrder - b.listOrder);

    return (
        <>
            <SEO title="Contact Us"/>
            <StyledMain>
                <MainContent>
                    <List aria-hidden="true">
                        <ListItem>Extensions</ListItem>
                        <ListItem>Property Repairs</ListItem>
                        <ListItem>Conversions</ListItem>
                        <ListItem>External Works</ListItem>
                        <ListItem>Business premises maintained</ListItem>
                    </List>
                    <FlexBox>
                        <ContactInfo>
                            {contacts.map(contact => (
                                <React.Fragment key={contact.id}>
                                    <Name>{contact.name}</Name>
                                    <Number href={`tel:${contact.number}`}>{contact.number}</Number>
                                </React.Fragment>
                            ))}
                            <Emails>
                                {contacts.map(contact => 
                                    <Email href={`mailto:${contact.email}`} key={`email-${contact.id}`}>{contact.email}</Email>
                                )}
                            </Emails>
                        </ContactInfo>
                        <ContactForm/>
                    </FlexBox>
                </MainContent>
            </StyledMain>
        </>
    );
};

const StyledMain = styled.main`
    margin: 1em;
`;

const MainContent = styled.div`
    max-width: 780px;
    margin: 2em auto;
    padding: 1em;
    background-color: #2a3035;
    border-radius: 10px;
    box-shadow: 5px 5px 5px #333333;
    @media only screen and (max-width: 560px) {
        padding: 1em;
    }
`;

const List = styled.ul`
    list-style-type: none;
    margin: 0 auto;
    margin-bottom: 1em;
    padding: 0;
    max-width: 39ex;
    text-align: center;
    @media only screen and (max-width: 768px) {
        display: none;
    }
`;

const ListItem = styled.li`
    display: inline;
    color: #a0df6d;
    font-size: small;
    &:before {
        margin: 1ex;
        content: url(${screw});
    }
    &:nth-child(odd) {
        color: #52af07;
    }
    &:nth-child(3):after {
        margin: 1ex;
        content: url(${screw});
    }
    &:nth-child(5):after {
        margin: 1ex;
        content: url(${screw});
    }
`;

const FlexBox = styled.div`
    display: flex;
    
    @media only screen and (max-width: 768px) {
        flex-direction: column;
    }
`;

const ContactInfo = styled.div`
    width: 50%;
    @media only screen and (max-width: 768px) {
        width: 100%;
        padding: 1em;
        padding-top: 0em;
    }
`;

const Name = styled.p`
    margin-bottom: 0;
    color: #a0df6d;
    font-weight: bold;
`;

const Number = styled.a`
    text-decoration: none;
    color: #8cde97;
`;

const Email = styled.a`
    display: block;
    text-decoration: none;
    color: white;
`;

const Emails = styled.div`
    margin-top: 4em;
    @media only screen and (max-width: 768px) {
        margin-top: 1em;
    }
`