// can probably just replace this all with some plug-in instead

import React, { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';

import { images } from './CarouselImages';

export const Carousel = props => {

    const [slide, setSlide] = useState(false);
    const [direction, setDirection] = useState("right");
    const [duration, setDuration] = useState(props.duration);

    const [lastIndex, setLastIndex] = useState(images.length - 1);
    const [index, setIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(1);

    const [isMounted, setIsMounted] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [forcing, setForcing] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        return () => setIsMounted(false);
    }, []);

    useEffect(() => {
            
        let timeout = () => {};

        if(isMounted) {
            if(!isHovering || forcing) {
                
                //while carousel is idle, wait for given duration
                timeout = setTimeout(() => {
                    setDuration(props.duration);

                    setSlide(true); // slides

                    // wait time for it to have done sliding, then swap properties
                    setTimeout(() => {
                        setSlide(false); // stops slide

                        if(direction === "right") {

                            if(lastIndex !== images.length - 1) {
                                setLastIndex(lastIndex + 1);
                            } else { setLastIndex(0); };

                            if(index !== images.length - 1) {
                                setIndex(index + 1);
                            } else { setIndex(0); };
                            
                            if(nextIndex !== images.length - 1) {
                                setNextIndex(nextIndex + 1);
                            } else { setNextIndex(0); };

                        } else {

                            if(lastIndex !== 0) {
                                setLastIndex(lastIndex - 1);
                            } else { setLastIndex(images.length - 1); };

                            if(index !== 0) {
                                setIndex(index - 1);
                            } else { setIndex(images.length - 1); };

                            if(nextIndex !== 0) {
                                setNextIndex(nextIndex - 1);
                            } else { setNextIndex(images.length - 1); };
                            
                        };

                    }, 1000); 

                }, duration);

            } else {
                clearTimeout(timeout);
            };
        };
        
        return () => clearTimeout(timeout);
        
    }, [isMounted, isHovering, forcing, duration, props.duration, direction, lastIndex, index, nextIndex]);
    
    const resumeSlides = () => {
        setIsHovering(false);

        if(direction === "left") { // did they last click left?
            if(forcing === true) { // if it's currently sliding, wait until over (stops abrupt direction swap mid-slide)
                setTimeout(() => {
                    setDirection("right");
                }, 1100);
            } else { // if not sliding, set right
                setDirection("right");
            }
        }
    };

    const forceSlides = (direction) => {
        if(slide === false) { // prevents spam of button
            setForcing(true);
            setTimeout(() => setForcing(false), 1000);
            setDuration(0);
            setDirection(direction);
        };
    };

    return (
        <CarouselContainer onMouseEnter={() => setIsHovering(true)} onMouseLeave={resumeSlides}>
            <ImageContainer>
                <Button onClick={() => forceSlides("left")}>‹</Button>
                <Button onClick={() => forceSlides("right")} right>›</Button>
                {slide && direction === "left" &&
                    <LastImage 
                        src={images[lastIndex].src} 
                        alt="Genuine Builders York" 
                        sliding={slide ? true : false}
                    />}
                <CurrentImage 
                    src={images[index].src} 
                    alt="Genuine Builders York"
                    sliding={slide ? true : false} 
                    direction={direction}
                />
                {slide && direction === "right" &&
                    <NextImage 
                        src={images[nextIndex].src} 
                        alt="Genuine Builders York"
                        sliding={slide ? true : false}
                    />}
                <Indexes>
                    {images.map((image) => <Index highlight={index + 1} active={slide ? true : false} key={image.key}/>)}
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

const Button = styled.button`
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
   padding: 0;
   cursor: pointer;
   &:hover {
    opacity: 90%;
   }
`;

const LastImage = styled.img`
    position: absolute;
    width: 100%;
    top: 0;
    z-index: 1;
    animation-name: ${props => props.sliding ? css`${LastSlide}` : ""};
    animation-duration: 0.8s;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
`;

const CurrentImage = styled.img`
    display: block;
    height: auto;
    max-width: 100%;
    position: relative;
    animation-name: ${props => props.sliding ? css`${CurrentSlide(props.direction)}` : ""};
    animation-duration: 0.8s;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
`;

const NextImage = styled.img`
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

const CurrentSlide = (dir) => keyframes`
    0% { left: 0; }
    100% { left: ${dir === "right" ? "-100%" : "100%" }; }
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
`;

const Index = styled.li`
    width: 10px;
    height: 10px;
    background-color: white;
    border-radius: 5px;
    display: inline-block;
    margin-right: 0.3em;
    opacity: 25%;
    
    &:nth-child(${props => props.highlight}) {
        opacity: ${props => props.active ? "25%" : "100%"};
    };
`;