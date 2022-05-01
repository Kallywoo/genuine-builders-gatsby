import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { GatsbyImage } from 'gatsby-plugin-image';
import { useSwipeable } from 'react-swipeable';
import styled from 'styled-components';

import { Portal } from './Portal';

import prev from '../images/lightbox-btn-prev.gif';
import next from '../images/lightbox-btn-next.gif';
import close from '../images/lightbox-btn-close.gif';

export const Modal = forwardRef(({ gallery, index, length, cache }, ref) => {

    const [display, setDisplay] = useState(false);

    const [arrayIndex, setArrayIndex] = useState(index.current);
    
    const moveLeft = useRef(null);
    const moveRight = useRef(null);
    const closeButton = useRef(null);

    useImperativeHandle(ref, () => {
        return {
                openModal: () => handleOpen(),
                closeModal: () => handleClose(),
            };
        }
    );

    const handleOpen = () => {
        setArrayIndex(index.current);
        setDisplay(true);
    };

    const handleClose = () => {
        setDisplay(false);
        cache.focus(); // gives focus back to last focused element before modal
    };

    const CycleImage = (direction) => {
        setArrayIndex((i) => {
            if (direction === "left") {
                return (i === 0) ? length - 1 : arrayIndex - 1;
            } else {
                return (i === length - 1) ? 0 : arrayIndex + 1;
            };
        });
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => CycleImage("right"),
        onSwipedRight: () => CycleImage("left"),
        preventDefaultTouchmoveEvent: true,
        trackMouse: false
    });

    const handleKeyDown = e => {
        switch (e.keyCode) {
            case 9: // TAB
                // tab traps the modal
                if (e.shiftKey) { // is SHIFT also held?
                    if (document.activeElement === moveLeft.current) {
                        closeButton.current.focus();
                        e.preventDefault();
                    };
                } else {
                    if (document.activeElement === closeButton.current) {
                        moveLeft.current.focus();
                        e.preventDefault();
                    };
                };
                break;
            case 27: // ESC
                handleClose();
                break;
            case 37: // Left arrow
            case 74: // J
                CycleImage("left");
                moveLeft.current.focus();
                break;
            case 39: // Right arrow
            case 75: // K
                CycleImage("right");
                moveRight.current.focus();
                break;
            default:
                break;
        };
    };

    useEffect(() => {
        if (display) {
            moveLeft.current.focus(); // sets focus on modal
            document.body.style.overflow = 'hidden'; // disables background scrolling
        } else {
            document.body.style.overflow = 'unset'; // re-enables scrolling
        };

        return () => document.body.style.overflow = 'unset';
    }, [display]);

    if (display) {
        return (
            <Portal>
                <ModalOverlay onClick={handleClose} />
                <ModalContainer 
                    onKeyDown={e => handleKeyDown(e)} 
                    role="dialog" 
                    aria-label="Image Gallery" 
                    aria-description="Use the Left and Right Arrow keys (or J and K) to navigate through the images, press Escape to close." /* eslint-disable-line jsx-a11y/aria-props -- says invalid ARIA: it's wrong?? */
                >
                    <ModalImage {...handlers}>
                        <ModalImageContainer>
                            <Background image={gallery[arrayIndex]?.thumb} alt="" />
                            <GatsbyImg 
                                image={gallery[arrayIndex]?.main} 
                                alt={gallery[arrayIndex]?.description || "Genuine Builders York"} 
                                objectFit="contain" 
                            />
                        </ModalImageContainer>
                        <ModalButton 
                            ref={moveLeft} 
                            left 
                            onClick={() => CycleImage("left")} 
                            aria-label="Previous Image"
                        >
                            <img src={prev} alt="" />
                        </ModalButton>
                        <ModalButton 
                            ref={moveRight} 
                            right 
                            onClick={() => CycleImage("right")} 
                            aria-label="Next Image"
                        >
                            <img src={next} alt="" />
                        </ModalButton>
                    </ModalImage>
                    <ModalInfo>
                        <span>Image {arrayIndex + 1} of {length}</span>
                        <ModalClose 
                            ref={closeButton} 
                            onClick={handleClose} 
                            aria-label="Close Modal"
                        >
                            <Image src={close} alt="" />
                        </ModalClose>
                    </ModalInfo>
                </ModalContainer>
            </Portal>
        );
    };

    return null;
});

const ModalOverlay = styled.div`
    position: fixed;
    background-color: rgb(0,0,0,0.8);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 3;
`;

const ModalContainer = styled.div`
    position: fixed;
    background-color: white;
    padding: 1em;
    text-align: center;
    left: 50%;
    transform: translate(-50%, 0);
    top: 20%;
    z-index: 4;
    min-width: 560px;
    display: flex;
    flex-direction: column;
    
    @media only screen and (max-width: 560px) {
        width: 100%;
        transform: none;
        min-width: 0;
        left: 0;
    };

    @media only screen and (max-width: 414px) {
        display: grid;
        top: 0;
        height: 100%;
        padding: 0;
        grid-template-rows: auto 1fr auto;
    };
`;

const Image = styled.img`
    vertical-align: middle;
    width: 100%;
    pointer-events: none;
`;

const Background = styled(GatsbyImage)`
    filter: blur(5px);
    z-index: -1;
    height: 100%;
    grid-row: 1;
    grid-column: 1;
    opacity: 0.75;
`;

const GatsbyImg = styled(GatsbyImage)`
    vertical-align: middle;
    pointer-events: none;
    grid-row: 1;
    grid-column: 1;
    max-height: 50vh;

    @media only screen and (max-width: 480px) {
        max-height: none;
    };
`;

const ModalImage = styled.div`
    position: relative;
    overflow: hidden;

    @media only screen and (max-width: 480px) {
        display: grid;
        grid-template-rows: 1fr auto;
        grid-template-columns: repeat(2, 1fr);
    };
`;

const ModalImageContainer = styled.div`
    display: grid;
    align-items: center;
    grid-column: span 2;
    z-index: -1;
    overflow: hidden;
`;

const ModalButton = styled.button`
    cursor: pointer;
    background-color: transparent;
    color: black;
    border-style: none;
    text-transform: uppercase;
    position: absolute;
    width: 50%;
    height: 100%;
    padding: 0;
    ${props => props.left ? "left: 0%" : "right: 0%"};
    top: 0;

    img {
        opacity: 0;
        position: absolute;
        top: 15%;
        ${props => props.left ? "left: -2.5%" : "right: -2.5%"};
        
        @media only screen and (max-width: 768px) {
            opacity: 1;
        };

        @media only screen and (max-width: 414px) {
            position: static;
        };
    };

    &:hover img, &:focus img {
        opacity: 100%;
    };

    &:focus {
        outline: none;
        
        img {
            outline: 2px solid black;
            outline-style: auto;
        };
    };

    @media only screen and (max-width: 414px) {
        position: static;
        text-align: ${props => props.left ? "left" : "right"};
        border: 1px solid rgba(0,0,0,0.25);
        height: 5em;
        grid-column: ${props => props.left ? "1" : "2"};
        grid-row: 2;
        width: 100%;

        &:focus {
            outline: auto;

            img {
                outline: none;
            };
        };
    };
`;

const ModalInfo = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 0.5em;

    @media only screen and (max-width: 414px) {
        margin-top: 0;
        padding: 1em;
        order: -1;
        box-shadow: 0px 0px 10px 5px rgba(0,0,0,0.5);
    };
`;

const ModalClose = styled.button`
    cursor: pointer;
    padding: 0;
    border: none;
    text-decoration: none;

    @media only screen and (max-width: 414px) {
        order: -1;
    };
`;