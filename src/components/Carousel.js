// can probably just replace this all with some plug-in instead??

import { graphql, useStaticQuery } from 'gatsby';
import React, { useEffect, useReducer, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useSwipeable } from 'react-swipeable';

import { reducer } from './CarouselReducer';

import placeholder from '../images/filler-image.jpg';

export const Carousel = ({ duration = 5000 }) => {

    useEffect(() => {
        if (process.env.NODE_ENV === "development") {
            if (duration < 899) {
                console.warn(`Carousel duration (${duration}) is too fast!! Minimum value allowed is 900.`);
            };
        };
    }, [duration]);

    const data = useStaticQuery(graphql`
        query {
            contentfulImageCarousel {
                images {
                    id
                    file {
                        url
                    }
                    description
                }
            }
        }
    `);

    const images = data.contentfulImageCarousel.images || [placeholder];
    const isImages = images.length > 1;

    const initialState = {
        active: isImages ? true : false,
        sliding: false,
        direction: "right",
        previous: images.length - 1,
        current: 0,
        next: 1,
        switched: false,
        swiped: false,
        duration: (duration > 899) ? duration : 900
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const newIndex = useRef(0);
    const timer = useRef();
    const timer2 = useRef();

    const handlers = useSwipeable({
        onSwipedLeft: () => forceDirection("FORCE_SWIPE", "right"),
        onSwipedRight: () => forceDirection("FORCE_SWIPE", "left"),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    useEffect(() => {
        const calculateDirection = (i) => {
            const maxLength = images.length - 1;

            if (state.direction === "right") { // do these images have one after their position to jump to? if not then reset to beginning
                return (i !== maxLength) ? ++i : 0;
            } else { // do these images (going left) have one before their position to jump to? if not then reset to end
                return (i !== 0) ? --i : maxLength;
            };
        };

        if (state.active) {
            timer.current = setTimeout(() => { // while carousel is idle, wait for given duration

                dispatch({ // set sliding to true (stops spam when forcing) and resets duration length
                    type: "INITIATE", 
                    payload: {duration: initialState.duration} 
                });

                timer2.current = setTimeout(() => { // wait time for it to have done sliding, then swap properties

                    const previous = calculateDirection(state.previous);
                    const current = state.switched ? newIndex.current : calculateDirection(state.current);
                    const next = calculateDirection(state.next);

                    dispatch({
                        type: "CHANGE_SLIDES",
                        payload: {
                            previous,
                            current,
                            next,
                        }
                    });

                }, state.swiped ? 450 : 850); 
            }, state.duration);

        } else {
            clearTimeout(timer.current);
        };
        
        return () => {
            clearTimeout(timer.current);
            // console.log("cleared");
        };
        
    }, [images.length, initialState.duration, state]);

    useEffect(() => {
        return () => clearTimeout(timer2.current); // clear timeout only on dismount, rather than every state change (which breaks carousel)
    }, []);

    const forceDirection = (type, direction) => {
        if (!state.sliding && isImages) {

            dispatch({
                type,
                payload: {direction}
            });
        };
    };

    const slideToIndex = (e) => {
        if (!state.sliding) {
            newIndex.current = images.findIndex((image) => image.id === e.target.id); // get index of selected in images array
            
            if (state.current !== newIndex.current) {
                if (newIndex.current <= state.current) {

                    dispatch({
                        type: "FORCE_TO_INDEX",
                        payload: {
                            previous: newIndex.current,
                            next: newIndex.current + 2,
                            direction: "left"
                        }
                    });

                } else {

                    dispatch({
                        type: "FORCE_TO_INDEX",
                        payload: {
                            previous: newIndex.current - 2,
                            next: newIndex.current,
                            direction: "right"
                        }
                    });
                
                };
            };
        };
    };

    return (
        <CarouselContainer 
            onMouseEnter={() => {
                return isImages 
                    ? dispatch({ type: "SET_ACTIVE", payload: {active: false} }) 
                    : null;
            }} 
            onMouseLeave={() => {
                return isImages 
                    ? dispatch({ type: "SET_ACTIVE", payload: {active: true} }) 
                    : null;
            }}
        >
            <ImageContainer>
                {isImages &&
                    <>
                        <SlideButton 
                            onClick={() => forceDirection("FORCE_SLIDES", "left")} 
                            aria-label="Previous Image"
                        >‹</SlideButton>
                        <SlideButton 
                            onClick={() => forceDirection("FORCE_SLIDES", "right")} 
                            aria-label="Next Image" right
                        >›</SlideButton>
                    </>
                }
                <div {...handlers}>
                    <LastImage 
                        src={images[state.previous]?.file?.url} 
                        alt={images[state.previous]?.description || "Genuine Builders York"}
                        sliding={state.sliding && state.direction === "left" ? true : false}
                        swiped={state.swiped ? true : false}
                    />
                    <CurrentImage 
                        src={isImages ? images[state.current]?.file?.url : images[0]} 
                        alt={isImages ? images[state.current]?.description : "Genuine Builders York"}
                        sliding={state.sliding ? true : false}
                        swiped={state.swiped ? true : false} 
                        $direction={state.direction}
                        width="716"
                        height="348"
                    />
                    <NextImage 
                        src={images[state.next]?.file?.url} 
                        alt={images[state.next]?.description || "Genuine Builders York"}
                        sliding={state.sliding && state.direction === "right" ? true : false}
                        swiped={state.swiped ? true : false}
                    />
                </div>
                {isImages &&
                    <Indexes>
                        {images.map((image, i) => 
                            <Index highlight={state.current + 1} active={state.sliding ? true : false} key={image.id}>
                                <IndexButton 
                                    id={image.id} 
                                    onClick={(e) => slideToIndex(e)}
                                    aria-label={(i + 1 === state.current + 1) ? `Current Image` : `Skip to Image ${i + 1}`}
                                />
                            </Index>
                        )}
                    </Indexes>
                }
            </ImageContainer>
        </CarouselContainer>
    );
};

const CarouselContainer = styled.div`
    margin: 1em auto;
    position: relative;
    cursor: grab;

    @media only screen and (max-width: 414px) {
        margin-top: 0;
        padding: 1em;
        padding-bottom: 0;
    };
`;

const ImageContainer = styled.div`
    position: relative;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;

    @media only screen and (max-width: 560px) {
        border: 1px solid black;
        box-shadow: 0px 0px 0px 1px darkgray;
    };
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
    };

    @media only screen and (max-width: 768px) {
        top: auto;
        width: 50px;
        height: 50px;
        bottom: 4.5%;
        font-size: xxx-large;
    };

    @media only screen and (max-width: 560px) {
        position: static;
        border-radius: 0;
        border: none;
        border-top: 1px solid darkgray;
        border-left: ${props => props.right ? "1px solid darkgray" : "none"};
        order: 1;
        width: 50%;
        opacity: 1;
        background-color: #26292c;
        color: #94979a;

        &:hover, &:focus {
            background-color: #232324;
            color: #e9eaea;
        };
    };
`;

const LastImage = styled.img`
    position: absolute;
    width: 100%;
    top: 0;
    left: -100%;
    z-index: 1;
    animation: 
    /* name: */ ${props => props.sliding ? LastSlide : null}
    /* duration: */ ${props => props.swiped ? "0.4s" : "0.8s"}
    /* easing: */ ease-out
    /* direction: */ forwards;
    pointer-events: none;
`;

const CurrentImage = styled.img`
    display: block;
    height: auto;
    max-width: 100%;
    position: relative;
    animation: 
    /* name: */ ${props => props.sliding ? CurrentSlide(props.$direction) : null}
    /* duration: */ ${props => props.swiped ? "0.4s" : "0.8s"}
    /* easing: */ ease-out
    /* direction: */ forwards;
    pointer-events: none;
`;

const NextImage = styled(LastImage)`
    left: 100%;
    animation: 
    /* name: */ ${props => props.sliding ? NextSlide : null}
    /* duration: */ ${props => props.swiped ? "0.4s" : "0.8s"}
    /* easing: */ ease-out
    /* direction: */ forwards;
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
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    list-style-type: none;
    position: absolute;
    margin: 0;
    padding: 0;
    top: 2.5%;
    right: 2%;
    z-index: 2;
    gap: 0.3em;

    @media only screen and (max-width: 768px) {
        top: auto;
        left: 0;
        right: 0;
        bottom: 7.5%;
        text-align: center;
        z-index: 1;
        gap: 1.25em;
    };

    @media only screen and (max-width: 560px) {
        display: none;
    };
`;

const Index = styled.li`
    opacity: 25%;
    transition: opacity 0.25s;
    
    &:nth-child(${props => props.highlight}) {
        opacity: ${props => props.active ? "25%" : "100%"};
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
