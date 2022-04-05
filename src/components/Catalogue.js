import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

import screw from '../images/screw.png';

export const Catalogue = () => {

    const data = useStaticQuery(graphql`
        query {
            contentfulArticleHeader {
                id
                list
            }
        }
    `);

    const { list } = data.contentfulArticleHeader;
    
    return (
        <List aria-hidden="true">
            {list.map((item, i) => 
                <ListItem key={`${list.id}-${i}`}>{item}</ListItem>
            )}
        </List>
    );
};

const List = styled.ul`
    list-style-type: none;
    margin: 0 auto 1em;
    padding: 0;
    padding-top: 0.2em;
    max-width: 395px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.25em 0em;
    
    @media only screen and (max-width: 768px) {
        display: none;
    };
`;

const ListItem = styled.li`
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