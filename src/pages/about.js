import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import { renderRichText } from 'gatsby-source-contentful/rich-text';

import screw from '../images/temp/screwBulletSmall.png';
import image from '../images/temp/Home6.png'
import SEO from '../components/SEO';

export const data = graphql`
  query {
    # contentfulArticleHeader {
    #   list
    # }
    contentfulParagraphWithHeader(contentful_id: {eq: "5px2a2HELBVYGlrhZWtE1g"}) {
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
    contentfulMotto {
      motto
    }
  }
`;

export default function About({ data }) {

    // const { list } = data.contentfulArticleHeader;
    const { aboutHeader, aboutParagraph } = data.contentfulParagraphWithHeader;
    const { nodes: values } = data.allContentfulValue;
    const { motto } = data.contentfulMotto;

    return (
        <>
            <SEO title="About Us" />
            <StyledMain>
                <MainContent>
                    <List aria-hidden="true">
                        <ListItem>Extensions</ListItem>
                        <ListItem>Property Repairs</ListItem>
                        <ListItem>Conversions</ListItem>
                        <ListItem>External Works</ListItem>
                        <ListItem>Business premises maintained</ListItem>
                    </List>
                    <Header>{aboutHeader}</Header>
                    {aboutParagraph && renderRichText(aboutParagraph)}
                    <Image src={image} alt="Genuine Builders York vehicles" width="716" height="348" />
                    <Header>Our Values</Header>
                    {values.map(value => 
                        <p key={value.id}><Category>{value.value}:</Category> {value.description.description}</p>
                    )}
                    <LiabilityLink to="/liability">Click here to view our liability insurance certificate</LiabilityLink>
                    <Image src={image} alt="Genuine Builders York vehicles" width="716" height="348" />
                    <Summary>
                        <Header>'In a Nutshell'</Header>
                        <Want>If you want a builder that starts and finishes on time.</Want>
                        <Want>A builder that you and your family feel comfortable with, while working in your home.</Want>
                        <Want>A company that completes the project leaving you completely satisfied.</Want>
                        <Assurance>Then we are the builders for you.</Assurance>
                    </Summary>
                    <Motto>{motto}</Motto>
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

const Header = styled.h3`
    color: #52af07;
`;

const Image = styled.img`
    width: 100%;
    margin: 1em 0em;
`;

const Category = styled.span`
    color: white;
`;

const LiabilityLink = styled(Link)`
    display: block;
    color: white;
    text-align: center;
    text-decoration: none;
`;

const Summary = styled.div`
    background-color: #475159;
    padding: 1em 2em;
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
`;
