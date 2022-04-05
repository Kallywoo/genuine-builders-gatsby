import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { graphql, Link } from 'gatsby';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { BLOCKS } from '@contentful/rich-text-types';
import styled from 'styled-components';

import { Catalogue } from '../components/Catalogue';
import SEO from '../components/SEO';

export const data = graphql`
    query {
        contentfulParagraphRichWithHeader(contentful_id: {eq: "5px2a2HELBVYGlrhZWtE1g"}) {
            aboutHeader: header
            aboutParagraph: paragraph {
                raw
            }
        }
        allContentfulValue {
            nodes {
                id
                value
                description {
                    description
                }
            }
        }
        signoff: contentfulTitleParagraphClose(contentful_id: {eq: "1FjllE6EE53PeJt2975M87"}) {
            title
            paragraph {
                raw
            }
            closing
        }
        contentfulMotto {
            motto
        }
    }
`;

export default function About({ data }) {

    const { aboutHeader, aboutParagraph } = data.contentfulParagraphRichWithHeader;
    const { nodes: values } = data.allContentfulValue;
    const { signoff } = data;
    const { motto } = data.contentfulMotto;

    const options = {
        renderNode: {
            [BLOCKS.PARAGRAPH]: (node, children) => <Want>{children}</Want>,
        }
    };

    return (
        <>
            <SEO title="About Us" />
            <StyledMain>
                <MainContent>
                    <Catalogue />
                    <Header>{aboutHeader}</Header>
                    {aboutParagraph && renderRichText(aboutParagraph)}
                    <ImageContainer>
                        <StaticImage src='../images/about-image.png' alt="Genuine Builders York vehicles" placeholder="blurred" />
                    </ImageContainer>
                    <Header>Our Values</Header>
                    {values.map(value => 
                        <p key={value.id}><Category>{value.value}:</Category> {value.description.description}</p>
                    )}
                    <LiabilityLink to="/liability">Click here to view our liability insurance certificate</LiabilityLink>
                    <ImageContainer>
                        <StaticImage src='../images/about-image.png' alt="Genuine Builders York vehicles" placeholder="blurred" />
                    </ImageContainer>
                    {signoff && 
                        <Summary>
                            <Header>'{signoff.title}'</Header>
                            {signoff.paragraph && renderRichText(signoff.paragraph, options)}
                            <Assurance>{signoff.closing}</Assurance>
                        </Summary>
                    }
                    <Motto>{motto}</Motto>
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
    padding: 1em 2em;
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
        padding: 0em 1em;
    };
`;

const Header = styled.h3`
    color: #52af07;

    @media only screen and (max-width: 414px) {
        margin-top: 0;
        padding-top: 1em;
        padding-bottom: 0.5em;
        border-bottom: 2px solid;
        margin-bottom: 0.75em;
        font-size: x-large;
    };
`;

const ImageContainer = styled.div`
    width: 100%;
    margin: 1em 0em;
    height: auto;
`;

const Category = styled.span`
    color: white;
`;

const LiabilityLink = styled(Link)`
    display: block;
    color: white;
    text-align: center;
    text-decoration: none;

    @media only screen and (max-width: 414px) {
        padding: 0.85em;
        font-size: 1.25em;
        border: 1px solid white;
    };
`;

const Summary = styled.div`
    background-color: #475159;
    padding: 1em 2em;

    @media only screen and (max-width: 414px) {
        padding: 0em 1em;
        padding-bottom: 1em;
    };
`;

const Want = styled.p`
    color: #aeca97;
`;

const Assurance = styled.p`
    color: #a0df6d;
`;

const Motto = styled.h3`
    color: white;
    text-align: center;
    font-weight: normal;

    @media only screen and (max-width: 414px) {
        margin-bottom: 0;
        padding-bottom: 1em;
    };
`;
