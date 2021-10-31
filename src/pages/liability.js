import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';

export const data = graphql`
    query {
        contentfulImageWithMetadata(contentful_id: {eq: "62ZgrpCnE57LyNe57rkZTD"}) {
            altTag
            image {
                fluid {
                    src
                }
            }
        }
    }
`;

export default function Liability({ data }) {

    const { altTag } = data.contentfulImageWithMetadata;
    const { src: certificate } = data.contentfulImageWithMetadata.image.fluid;

    return (
        <>
            <SEO title="Liability Insurance Certificate"/>
            <StyledMain>
                <Image src={certificate} alt={altTag}/>
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
`;

const Image = styled.img`
    width: auto;
`;