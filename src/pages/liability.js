import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
import styled from 'styled-components';

import SEO from '../components/SEO';

export const data = graphql`
    query {
        contentfulImageWithMetadata(contentful_id: {eq: "62ZgrpCnE57LyNe57rkZTD"}) {
            altTag
            image {
                gatsbyImageData(placeholder: BLURRED)
            }
        }
    }
`;

export default function Liability({ data }) {

    const { altTag } = data.contentfulImageWithMetadata;
    const certificate = data.contentfulImageWithMetadata.image.gatsbyImageData;

    return (
        <>
            <SEO title="Liability Insurance Certificate" />
            <StyledMain>
                <Image image={certificate} alt={altTag} />
            </StyledMain>
        </>
    );
};

const StyledMain = styled.main`
    max-width: 780px;
    margin: 2em auto;
    padding: 1em 2em;
    background-color: #2a3035;
    border-radius: 10px;
    box-shadow: 5px 5px 5px #333333;
    text-align: center;

    @media only screen and (max-width: 414px) {
        margin: 0;
        padding: 1em;
        border-radius: 0;
    };
`;

const Image = styled(GatsbyImage)`
    width: auto;
`;