import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';

import screw from '../images/temp/screwBulletSmall.png';
import prev from '../images/temp/lightbox-btn-prev.gif';
import next from '../images/temp/lightbox-btn-next.gif';
import close from '../images/temp/lightbox-btn-close.gif';

import { GalleryQuery, CreateMasterArray } from '../components/GalleryImages';

import { Portal } from '../components/Modal';
import SEO from '../components/SEO';

export default function Gallery() {

    const images = GalleryQuery();
    const masterArray = CreateMasterArray();

    const [active, setActive] = useState(false);
    const [id, setId] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const [arrayIndex, setArrayIndex] = useState(0);
    
    const [cachedTab, setCachedTab] = useState(null);
    
    const containerRef = useRef(null);
    const modalRef = useRef(null);

    const moveLeft = useRef(null);
    const moveRight = useRef(null);
    const closeButton = useRef(null);

    const ShowComparisons = (e) => { // opens comparisons box
        setActive(true);
        if(e.target.id && e.target.id !== id) { // does the clicked container have an ID and is it a different one to previous click?
            setId(images.findIndex((element) => element.id === e.target.id)); // finds the project with same id as clicked for render to know which index is the object that contains the specific before/afters
        } else if(!e.target.id) { // if there is no id
            console.error("no id found for this image!");
        };
    };

    useEffect(() => {
        if(active) {
            containerRef.current.focus(); // sets focus on comparisons box
        };
    }, [active, id]);

    useEffect(() => {
        if(showModal) {
            moveLeft.current.focus(); // sets focus on modal
        };
    }, [showModal]);

    const ToggleModal = (e) => {
        if(!showModal) {
            setCachedTab(document.activeElement); // captures the last focused element to jump back to after the modal is closed (wonder if there's another way to do this with React?)
            setArrayIndex(masterArray.findIndex((element) => element.id === e.target.id)); // searches masterArray to find object with matching id as clicked container and saves it
            setShowModal(true);
        } else {
            setShowModal(false);
            cachedTab.focus();
        };
    };

    const CycleImage = (direction) => {
        if(direction === "left") {
            (arrayIndex === 0) ? setArrayIndex(masterArray.length - 1) : setArrayIndex(arrayIndex - 1);
        } else {
            (arrayIndex === masterArray.length - 1) ? setArrayIndex(0) : setArrayIndex(arrayIndex + 1);
        };
    };

    const handleKeyDown = e => {
        switch(e.keyCode) {
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
                ToggleModal();
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

    return (
        <>
            <SEO title="Gallery"/>
            <StyledMain>
                <MainContent>
                    <List aria-hidden="true">
                        <ListItem>Extensions</ListItem>
                        <ListItem>Property Repairs</ListItem>
                        <ListItem>Conversions</ListItem>
                        <ListItem>External Works</ListItem>
                        <ListItem>Business premises maintained</ListItem>
                    </List>
                    {active &&
                        <Comparisons ref={containerRef} tabIndex={-1}>
                            <ComparisonContainer>
                                <Span>Before</Span>
                                {images[id]?.before.map(image =>
                                    <OpenModalButton 
                                        id={image.id} 
                                        key={image.id} 
                                        onClick={(e) => ToggleModal(e)}
                                        aria-label="Open Gallery Modal"
                                    >
                                        <ComparisonImage 
                                            image={image.thumb}
                                            alt="Genuine Builders York"
                                        />
                                    </OpenModalButton>
                                )}
                            </ComparisonContainer>
                            <ComparisonContainer>
                                <Span>After</Span>
                                {images[id]?.after.map(image =>
                                    <OpenModalButton 
                                        id={image.id} 
                                        key={image.id} 
                                        onClick={(e) => ToggleModal(e)} 
                                        aria-label="Open Gallery Modal"
                                    >
                                        <ComparisonImage 
                                            image={image.thumb}
                                            alt="Genuine Builders York"
                                        />
                                    </OpenModalButton>
                                )}
                            </ComparisonContainer>
                        </Comparisons>
                    }
                    <Grid>
                        {images?.map(image => 
                            <Button 
                                onClick={ShowComparisons} 
                                id={image.id ? image.id : ""}
                                key={image.id ? image.id : ""}
                                aria-label="View Comparisons"
                            >
                                <GatsbyImg image={image.after[0].thumb} alt="Genuine Builders York"/>
                            </Button>
                        )}
                    </Grid>
                    {showModal && 
                        <Portal>
                            <ModalOverlay onClick={ToggleModal}/>
                            <ModalDiv 
                                ref={modalRef} 
                                tabIndex={-2} 
                                onKeyDown={e => handleKeyDown(e)} 
                                role="dialog" 
                                aria-label="Image Gallery" 
                                aria-description="Use the Left and Right Arrow keys (or J and K) to navigate through the images, press Escape to close."
                            >
                                <ModalImage>
                                    <GatsbyImg image={masterArray[arrayIndex].main} alt=""/>
                                    <ModalButton 
                                        ref={moveLeft} 
                                        left 
                                        onClick={() => CycleImage("left")} 
                                        aria-label="Previous Image"
                                    >
                                        <img src={prev} alt=""/>
                                    </ModalButton>
                                    <ModalButton 
                                        ref={moveRight} 
                                        right 
                                        onClick={() => CycleImage("right")} 
                                        aria-label="Next Image"
                                    >
                                        <img src={next} alt=""/>
                                    </ModalButton>
                                </ModalImage>
                                <ModalInfo>
                                    <span>Image {arrayIndex + 1} of {masterArray.length}</span>
                                    <ModalClose 
                                        ref={closeButton} 
                                        onClick={ToggleModal} 
                                        aria-label="Close Modal"
                                    >
                                        <Image src={close} alt=""/>
                                    </ModalClose>
                                </ModalInfo>
                            </ModalDiv>
                        </Portal>
                    }
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
    padding: 1em;
    background-color: #2a3035;
    border-radius: 10px;
    box-shadow: 5px 5px 5px #333333;
    
    @media only screen and (max-width: 560px) {
        padding: 1em;
    };
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
    };
`;

const ListItem = styled.li`
    display: inline;
    color: #a0df6d;
    font-size: small;
    &:before {
        margin: 1ex;
        content: url(${screw});
    };
    &:nth-child(odd) {
        color: #52af07;
    };
    &:nth-child(3):after {
        margin: 1ex;
        content: url(${screw});
    };
    &:nth-child(5):after {
        margin: 1ex;
        content: url(${screw});
    };
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1em;

    @media only screen and (max-width: 560px) {
        grid-template-columns: 1fr 1fr;
    };
`;

const Button = styled.button`
    cursor: pointer;
    padding: 1em;
    background-color: #475159;
    border-style: none;
`;

const Image = styled.img`
    vertical-align: middle;
    width: 100%;
    pointer-events: none;
`;

const GatsbyImg = styled(GatsbyImage)`
    vertical-align: middle;
    width: 100%;
    pointer-events: none;
`;

const Comparisons = styled.div`
    display: flex;
    justify-content: space-around;
    margin-bottom: 1em;
    padding: 1em;
    background-color: #475159;
`;

const ComparisonContainer = styled.div`
    text-align: center;
    &:nth-child(2) {
        @media only screen and (max-width: 560px) {
            margin-left: 1em;
        };
    };
`;

const Span = styled.span`
    color: #a0df6d;
`;

const OpenModalButton = styled(Button)`
    display: block;
    padding: 0em;
`;

const ComparisonImage = styled(GatsbyImg)`
    margin: 0.5em 0em;
    pointer-events: none;
`;

const ModalOverlay = styled.div`
    position: fixed;
    background-color: rgb(0,0,0,0.8);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 3;
`;

const ModalDiv = styled.div`
    position: fixed;
    background-color: white;
    padding: 1em;
    text-align: center;
    margin: auto;
    left: 33%;
    right: 33%;
    top: 20%;
    z-index: 4;

    @media only screen and (max-width: 768px) {
        left: 20%;
        right: 20%;
    };
    @media only screen and (max-width: 560px) {
        left: 0;
        width: 100%;
    };
`;

const ModalImage = styled.div`
    position: relative;
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

    img {
        opacity: 0;
        position: absolute;
        top: 15%;
        ${props => props.left ? "left: -2.5%" : "right: -2.5%"};
        @media only screen and (max-width: 768px) {
            opacity: 1;
        };
    };
    &:hover img, &:focus img {
        opacity: 100%;
    };
`;

const ModalInfo = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 0.5em;
`;

const ModalClose = styled.button`
    cursor: pointer;
    padding: 0;
    border: none;
    text-decoration: none;
`;