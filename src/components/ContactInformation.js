import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

import square from '../images/square.png';

export const ContactInformation = () => {

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
        <Address>
            <Square src={square} alt="" />
            <Grid>
                {contacts.slice(0, 2).map(contact => 
                    <React.Fragment key={contact.id}>
                        {contact.name ? 
                            <Name aria-hidden="true">{contact.name}</Name>
                        : null}
                        {contact.number ? 
                            <Number 
                                href={`tel:${contact.number.replace(/\s+/g, '')}`} 
                                aria-label={`${contact.name}'s phone number: ${contact.number}`}
                            >{contact.number}</Number> 
                        : null}
                        {contact.email ? 
                            <Email 
                                href={`email:${contact.email}`} 
                                aria-label={`${contact.name}'s email address: ${contact.email}`}
                            >{contact.email}</Email> 
                        : null}
                    </React.Fragment>
                )}
            </Grid>
            <Square src={square} alt="" />
        </Address>
    );
};

const Address = styled.address`
    display: inherit;
    font-style: normal;
`;

const Square = styled.img`
    width: 2em;
    height: 2em;
    display: flex;
    align-self: center;

    @media only screen and (max-width: 560px) {
        display: none;
    };
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
    };

    @media only screen and (max-width: 414px) {
        font-size: 0.9em;
    };
`;

const Name = styled.p`
    margin: 0;
    grid-column: 1;
    white-space: nowrap;
    
    @media only screen and (max-width: 560px) {
        color: #52af07;
        text-transform: uppercase;
    };
`;

/*
const NameSpan = styled.span`
    @media only screen and (max-width: 560px) {
        display: none;
    };
`;
*/

const Number = styled.a`
    white-space: nowrap;
    text-decoration: none;
    color: #aeca97;
    grid-column: 2;

    @media only screen and (max-width: 560px) {
        color: #8cde97;
    };
`;

const Email = styled.a`
    white-space: nowrap;
    text-decoration: none;
    color: white;
    grid-column: 3;

    @media only screen and (max-width: 560px) {
        order: 3;
        grid-column: span 3;
    };
`;
