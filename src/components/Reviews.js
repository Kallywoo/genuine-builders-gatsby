import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export const Reviews = ({fade, duration}) => {
    
    const reviews = [
        {
            quote: "Brilliant job in the loft - completed on time and to the usual excellent standard.",
            cite: "Steve & Lucy",
        },
        {
            quote: "Both you and the people that worked with you were considerate and very professional.",
            cite: "Mr & Mrs M, Acomb, York",
        },
        {
            quote: "Fantastic job. We were both really impressed and very happy with the result.",
            cite: "Laura",
        }
    ];

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
`;

const Cite = styled.cite`
    font-style: normal;
`;