// can probably just replace this all with some plug-in instead, lots of re-renders! seemingly no performance hit though..

import { graphql, useStaticQuery } from 'gatsby';
import React, { useState, useEffect, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';
import { useSwipeable } from 'react-swipeable';

export const Carousel = props => {

    const data = useStaticQuery(graphql`
        query {
            contentfulImageCarousel {
                images {
                    id
                    gatsbyImageData#(placeholder: BLURRED)
                }
            }
        }
    `);

    const { images } = data.contentfulImageCarousel;

    const [slide, setSlide] = useState(false);
    const [direction, setDirection] = useState("right");
    const [duration, setDuration] = useState(props.duration);

    const [lastIndex, setLastIndex] = useState(images.length - 1);
    const [index, setIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(1);
    
    const [isMounted, setIsMounted] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [forcing, setForcing] = useState(false);
    const [isSwitched, setIsSwitched] = useState(false);

    const newIndex = useRef(0);

    const handlers = useSwipeable({
        onSwipedLeft: () => forceSlides("right"),
        onSwipedRight: () => forceSlides("left"),
        preventDefaultTouchmoveEvent: true,
        trackMouse: false
    });

    useEffect(() => {
        setIsMounted(true);

        return () => setIsMounted(false);
    }, []);

    useEffect(() => {
            
        let timeout = () => {};

        if (isMounted) {
            if (!isHovering || forcing) {
                
                // while carousel is idle, wait for given duration
                timeout = setTimeout(() => {
                    setDuration(props.duration);

                    setSlide(true); // slides

                    // wait time for it to have done sliding, then swap properties
                    setTimeout(() => {
                        setSlide(false); // stops slide

                        if (direction === "right") {
                            // do these images have one after their position to jump to? if not then reset to beginning

                            (lastIndex !== images.length - 1) ? setLastIndex(lastIndex + 1) : setLastIndex(0);

                            if(!isSwitched) { // has user NOT forced the current image to a new position via index buttons?
                                (index !== images.length - 1) ? setIndex(index + 1) : setIndex(0);
                            } else {
                                setIndex(newIndex.current);
                                setIsSwitched(false);
                            };

                            (nextIndex !== images.length - 1) ? setNextIndex(nextIndex + 1) : setNextIndex(0);

                        } else {
                            // do these images (going left) have one before their position to jump to? if not then reset to end

                            (lastIndex !== 0) ? setLastIndex(lastIndex - 1) : setLastIndex(images.length - 1);

                            if(!isSwitched) { // has user NOT forced the current image to a new position via index buttons?
                                (index !== 0) ? setIndex(index - 1) : setIndex(images.length - 1);
                            } else {
                                setIndex(newIndex.current);
                                setIsSwitched(false);
                            };

                            (nextIndex !== 0) ? setNextIndex(nextIndex - 1) : setNextIndex(images.length - 1);

                            setDirection("right"); // reset direction after being forced left
                        };

                    }, 1000); 

                }, duration);

            } else {
                clearTimeout(timeout);
            };
        };
        
        return () => clearTimeout(timeout);
        
    }, [isMounted, isHovering, forcing, duration, props.duration, direction, lastIndex, index, nextIndex, images.length, isSwitched]);

    const forceSlides = (direction) => {
        if (slide === false) { // prevents spam of button
            setForcing(true);
            setTimeout(() => setForcing(false), 1000);
            setDuration(0);
            setDirection(direction);
        };
    };

    const slideToIndex = (e) => {
        if (slide === false) { // prevents awkward switch if you hit a direction button
            // grab index from searching id in images array
            newIndex.current = images.findIndex((image) => image.id === e.target.id);

            if (index !== newIndex.current) {
                setIsSwitched(true);
                if (newIndex.current <= index) {
                    setLastIndex(newIndex.current);
                    setNextIndex(newIndex.current + 2); // on left, nextIndex is made nextIndex-1, so newIndex+1 in this case would just be equal to index, hence +2
                    forceSlides("left");
                } else {
                    setNextIndex(newIndex.current);
                    setLastIndex(newIndex.current - 2); // same as comment above, except flipped direction/equation
                    forceSlides("right");
                };
            };
        };
    };

    return (
        <CarouselContainer onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <ImageContainer>
                <SlideButton onClick={() => forceSlides("left")} aria-label="Previous Image">‹</SlideButton>
                <SlideButton onClick={() => forceSlides("right")} right aria-label="Next Image">›</SlideButton>
                <div {...handlers}>
                    {slide && direction === "left" &&
                        <LastImage sliding={slide ? true : false}> 
                            <GatsbyImage
                                image={images[lastIndex].gatsbyImageData} 
                                alt="Genuine Builders York" 
                            />
                        </LastImage>
                    }
                    <CurrentImage sliding={slide ? true : false} direction={direction}> 
                        <GatsbyImage
                            image={images[index].gatsbyImageData} 
                            alt="Genuine Builders York"
                            loading="eager"
                        />
                    </CurrentImage>
                    {slide && direction === "right" &&
                        <NextImage sliding={slide ? true : false}>
                            <GatsbyImage
                                image={images[nextIndex].gatsbyImageData} 
                                alt="Genuine Builders York"
                            />
                        </NextImage>
                    }
                </div>
                <Indexes>
                    {images.map((image, i) => 
                        <Index highlight={index + 1} active={slide ? true : false} key={image.id}>
                            <IndexButton 
                                id={image.id} 
                                onClick={(e) => slideToIndex(e)} 
                                aria-label={i + 1 === index + 1 ? `Current Image` : `Skip to Image ${i + 1}`}
                            />
                        </Index>)}
                </Indexes>
            </ImageContainer>
        </CarouselContainer>
    );
};

const CarouselContainer = styled.div`
    margin: 1em auto;
    position: relative;
`;

const ImageContainer = styled.div`
    position: relative;
    width: 100%;
    overflow: hidden;
`;

const SlideButton = styled.button`
   position: absolute;
   top: 50%;
   ${props => props.right ? "right: 2.5%" : "left: 2.5%"};
   z-index: 2;
   background-color: #222222;
   color: #ffffff;
   border-style: none;
   border: 3px solid #ffffff;
   border-radius: 100%;
   font-size: xx-large;
   font-weight: bold;
   opacity: 50%;
   width: 40px;
   height: 40px;
   line-height: 0em;
   padding-bottom: 5px;
   ${props => props.right ? "padding-right: 4px" : "padding-left: 3px"};
   cursor: pointer;
   
   &:hover {
    opacity: 90%;
   }

   @media only screen and (max-width: 768px) {
        top: auto;
        width: 50px;
        height: 50px;
        bottom: 4.5%;
        font-size: xxx-large;
    }

    @media only screen and (max-width: 560px) {
        opacity: 0;
        pointer-events: none;
    }
`;

const LastImage = styled.div`
    position: absolute;
    width: 100%;
    top: 0;
    z-index: 1;
    animation-name: ${props => props.sliding ? css`${LastSlide}` : ""};
    animation-duration: 0.8s;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
`;

const CurrentImage = styled.div`
    display: block;
    height: auto;
    max-width: 100%;
    position: relative;
    animation-name: ${props => props.sliding ? css`${CurrentSlide(props.direction)}` : ""};
    animation-duration: 0.8s;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
`;

const NextImage = styled.div`
    position: absolute;
    width: 100%;
    top: 0;
    
    animation-name: ${props => props.sliding ? css`${NextSlide}` : ""};
    
    animation-duration: 0.8s;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
`;

const LastSlide = keyframes`
    0% { left: -100%; }
    100% { left: 0; }
`;

const CurrentSlide = (direction) => keyframes`
    0% { left: 0; }
    100% { left: ${direction === "right" ? "-100%" : "100%" }; }
`;

const NextSlide = keyframes`
    0% { left: 100%; }
    100% { left: 0; }
`;

const Indexes = styled.ol`
    position: absolute;
    list-style-type: none;
    margin: 0;
    padding: 0;
    top: 2.5%;
    right: 2%;
    z-index: 2;

    @media only screen and (max-width: 768px) {
        top: auto;
        left: 0;
        right: 0;
        bottom: 7.5%;
        text-align: center;
        z-index: 1;
    };
`;

const Index = styled.li`
    display: inline-block;
    margin-right: 0.3em;
    opacity: 25%;
    
    &:nth-child(${props => props.highlight}) {
        opacity: ${props => props.active ? "25%" : "100%"};
    };

    @media only screen and (max-width: 768px) {
        margin-right: 1.25em;

        &:last-child {
            margin-right: 0;
        };
    };
`;

const IndexButton = styled.button`
    width: 12px;
    height: 12px;
    background-color: white;
    border-radius: 100%;
    border-style: none;
    cursor: pointer;

    @media only screen and (max-width: 768px) {
        width: 20px;
        height: 20px;
    };
`;
