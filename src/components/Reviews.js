import { graphql, useStaticQuery } from 'gatsby';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export const Reviews = ({fade, duration}) => {
    
    const data = useStaticQuery(graphql`
        query {
            allContentfulTestimonial {
                reviews: nodes {
                    quote
                    cite: author
                }
            }
        }
    `);

    const { reviews } = data.allContentfulTestimonial;

    const [fadeOut, setFadeOut] = useState(false);
    const [index, setIndex] = useState(0);
    
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        return () => setIsMounted(false);
    }, []);

    useEffect(() => {

        let timeout = () => {};

        if(isMounted) {
            setFadeOut(false); // fades in

            // while in faded-in (visible) state, wait 3 seconds
            timeout = setTimeout(() => {

                setFadeOut(true); // fades out
            
                // wait the time it takes to fade out, then swap
                setTimeout(() => {

                    // while faded out (invisible), updates the index
                    // in turn calling useEffect and repeating the cycle
                    if(index !== reviews.length - 1) {
                        setIndex(index + 1);
                    } else {
                        setIndex(0);
                    };

                }, fade);

            }, duration);
        } else {
            clearTimeout(timeout);
        };

        return () => clearTimeout(timeout);
        
    }, [isMounted, index, fade, duration, reviews.length]);

    return (
        <Blockquote fade={fadeOut ? true : false}>
            <p>“ {reviews[index].quote} ”</p>
            <Cite>{reviews[index].cite}</Cite>
        </Blockquote>
    );
};

const Blockquote = styled.blockquote`
    opacity: ${props => props.fade ? "0" : "1"};
    transition: opacity 1s ease;
    margin: 0;
    color: #a0df6d;
    font-weight: bold;

    /* remove all of below for original styling */
    font-size: 1.25em;
    margin: 0 auto;
    padding: 0.1em;
    padding-bottom: 1em;
    width: 85%;

    cite {
        font-size: 0.9em;
        font-weight: normal;
    }

    @media only screen and (max-width: 560px) {
        width: 100%;
    }
`;

const Cite = styled.cite`
    font-style: normal;
`;