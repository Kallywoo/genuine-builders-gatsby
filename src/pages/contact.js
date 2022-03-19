import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import { ContactForm } from '../components/ContactForm';
import SEO from '../components/SEO';

import screw from '../images/screw.png';

export const data = graphql`
    query {
        contentfulArticleHeader {
            id
            list
        }
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

    const { list } = data.contentfulArticleHeader;

    const { contacts } = data.allContentfulContact;
    contacts.sort((a, b) => a.listOrder - b.listOrder);

    return (
        <>
            <SEO title="Contact Us" />
            <StyledMain>
                <MainContent>
                    <List aria-hidden="true">
                        {list.map((item, i) => 
                            <ListItem key={`${list.id}-${i}`}>{item}</ListItem>
                        )}
                    </List>
                    <FlexBox>
                        <ContactInfo>
                            {contacts.map(contact => 
                                <React.Fragment key={contact.id}>
                                    <Name>{contact.name}</Name>
                                    <Number href={`tel:${contact.number.replace(/\s+/g, '')}`}>{contact.number}</Number>
                                </React.Fragment>
                            )}
                            <Emails>
                                {contacts.map(contact => 
                                    <Email href={`mailto:${contact.email}`} key={`email-${contact.id}`}>{contact.email}</Email>
                                )}
                            </Emails>
                        </ContactInfo>
                        <ContactForm />
                    </FlexBox>
                </MainContent>
            </StyledMain>
        </>
    );
};

const StyledMain = styled.main`
    margin: 1em;

    @media only screen and (max-width: 414px) {
        margin: 0;
    };
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
    };

    @media only screen and (max-width: 414px) {
        margin: 0;
        border-radius: 0;
        box-shadow: none;
        /* padding: 0em; */
    };
`;

const List = styled.ul`
    list-style-type: none;
    margin: 0 auto;
    margin-bottom: 1em;
    padding: 0;
    max-width: 395px;
    text-align: center;

    @media only screen and (max-width: 768px) {
        display: none;
    };
`;

const ListItem = styled.li`
    display: inline;
    color: #a0df6d;
    font-size: small;
    white-space: nowrap;

    &:before {
        margin: 1ex;
        content: url(${screw});
    };

    &:nth-child(odd) {
        color: #52af07;
    };

    &:nth-child(3):after {
        margin: 1ex;
        content: url(${screw});
    };

    &:nth-child(5):after {
        margin: 1ex;
        content: url(${screw});
    };
`;

const FlexBox = styled.div`
    display: flex;
    
    @media only screen and (max-width: 768px) {
        flex-direction: column;
    };
`;

const ContactInfo = styled.address`
    width: 50%;
    font-style: normal;

    @media only screen and (max-width: 768px) {
        width: 100%;
        padding: 1em;
        padding-top: 0em;
    };

    @media only screen and (max-width: 414px) {
        display: none;
    };
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
    };
`
