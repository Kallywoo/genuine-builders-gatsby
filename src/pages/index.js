import React from 'react';
import styled from 'styled-components';
import screw from '../images/temp/screwBulletSmall.png';

import { Reviews } from '../components/Reviews';
import { Carousel } from '../components/Carousel';
import { graphql } from 'gatsby';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import SEO from '../components/SEO';

// if Twitter 'Follow' button and/or Timeline is wanting to be kept
// https://www.gatsbyjs.com/plugins/gatsby-plugin-twitter/

// if Facebook 'Like' button is wanting to be kept
// https://www.gatsbyjs.com/plugins/gatsby-source-facebook/

export const data = graphql`
    query {
        # contentfulArticleHeader {
        #     list
        # }
        contentfulRichParagraph(contentful_id: {eq: "305CEBABooWw43tpVMCKOy"}) {
            paragraph {
                raw
            }
        }
        contentfulMotto {
            motto
        }
        contentfulParagraph(contentful_id: {eq: "5SrU1MKOoxOM5dTlTTBRl1"}) {
            paragraph {
                paragraph
            }
        }
    }
`;

export default function Main({ data }) {

    // const { list } = data.contentfulArticleHeader;
    const { paragraph: mainText } = data.contentfulRichParagraph;
    const { motto } = data.contentfulMotto;
    const { paragraph: guarantee } = data.contentfulParagraph.paragraph;

    const options = {
        renderNode: {
            [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
            [INLINES.HYPERLINK]: ({ data }, children) => <Contact href={data.uri}>{children}</Contact>
        }
    };

    return (
        <>
            <SEO title="Home" />
            <StyledMain>
                <MainContent>
                    <List aria-hidden="true">
                        <ListItem>Extensions</ListItem>
                        <ListItem>Property Repairs</ListItem>
                        <ListItem>Conversions</ListItem>
                        <ListItem>External Works</ListItem>
                        <ListItem>Business premises maintained</ListItem>
                    </List>
                    <Carousel duration="5000" />
                    {mainText && renderRichText(mainText, options)}
                    <Motto>{motto}</Motto>
                    <SecondaryContent>
                        <Reviews fade="1000" duration="5000" />
                        <Guarantee>{guarantee}</Guarantee>
                    </SecondaryContent>
                    {/* <Twitter>Tweets by GenuineBuilders</Twitter> */}
                </MainContent>
            </StyledMain>
        </>
    )
};

const StyledMain = styled.main`
    margin: 1em;
`;

const MainContent = styled.div`
    max-width: 780px;
    margin: 2em auto;
    padding: 1em 2em;
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

const Text = styled.p`
    margin: 0;
`;

const Contact = styled.a`
    text-decoration: none;
    font-weight: bold;
    color: lightgreen;
`;

const Motto = styled.h3`
    color: white;
    text-align: center;
    font-weight: normal;
`;

const SecondaryContent = styled.div`
    /* display: inline-block; */
    /* width: 40%; */
    
    /* remove all below (except media query), uncomment above 
    for original layout/styling for use with twitter timeline */
    display: block;
    width: 90%;
    text-align: center;
    margin: 0 auto;

    @media only screen and (max-width: 560px) {
        width: 100%;
        padding: 0em 0.5em;
    }
`;

const Guarantee = styled.p`
    background-color: #475159;
    padding: 1em;
    @media only screen and (max-width: 560px) {
        display: none;
    }
`;

// const Twitter = styled.a`
//     width: 50%;
//     vertical-align: top;
//     color: white;
// `;
