import React, { useState, useRef, useEffect } from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import { Catalogue } from '../components/Catalogue';
import { Modal } from "../components/Modal";
import SEO from '../components/SEO';

export const data = graphql`
    query {
        contentfulImageGallery {
            images: projects {
                id
                before {
                    id
                    main: gatsbyImageData(placeholder: BLURRED)
                    thumb: gatsbyImageData(placeholder: BLURRED, width: 212)
                }
                after {
                    id
                    main: gatsbyImageData(placeholder: BLURRED)
                    thumb: gatsbyImageData(placeholder: BLURRED, width: 212)
                }
            }
        }
    }
`;

export default function Gallery({ data }) {

    const { images } = data.contentfulImageGallery;

    const [masterArray, setMasterArray] = useState([]);

    const [active, setActive] = useState(false);
    const [id, setId] = useState(0);
    const [swapped, hasSwapped] = useState(false);

    const [cachedTab, setCachedTab] = useState(null);

    const arrayIndex = useRef(0);
    
    const containerRef = useRef(null);
    const modalRef = useRef(null);

    useEffect(() => {
        let array = [];
    
        for(let index in images) {
    
            for(let item in images[index].before) {
                array.push(images[index].before[item]);
                array.push(images[index].after[item]);
            };
    
            for(let item in images[index].after) {
                if (!array.find(element => element.id === images[index].after[item].id)) {
                    array.push(images[index].after[item]);
                };
            };
        };
    
        setMasterArray(array);

    }, [images]);

    useEffect(() => {
        if (active && !swapped) {
            containerRef.current.focus(); // sets focus on comparisons box
        };
    }, [active, id, swapped]);

    const ShowComparisons = (e) => { // opens comparisons box
        setActive(true);
        if (e.target.id && e.target.id !== id) { // does the clicked container have an ID and is it a different one to previous click?
            setId(images.findIndex((element) => element.id === e.target.id)); // finds the project with same id as clicked for render to know which index is the object that contains the specific before/afters
        } else if (!e.target.id) { // if there is no id
            console.error("no id found for this image!");
        };
    };

    const ChangeComparisons = (direction) => {
        setId((id) => {
            if (direction === "left") {
                return id !== 0 ? --id : images.length - 1;
            } else {
                return id !== images.length - 1 ? ++id : 0;
            };
        });
        hasSwapped(true);
    };

    const ToggleModal = (e) => {
        setCachedTab(document.activeElement); // captures the last focused element to jump back to after the modal is closed (wonder if there's another way to do this with React?)
        arrayIndex.current = masterArray.findIndex((element) => element.id === e.target.id); // searches masterArray to find object with matching id as clicked container and saves it
        modalRef.current.openModal();
    };

    return (
        <>
            <SEO title="Gallery" />
            <StyledMain>
                <MainContent>
                    <Catalogue />
                    {active &&
                        <Comparisons ref={containerRef} tabIndex={-1}>
                            <SlideButton onClick={() => ChangeComparisons("left")} aria-label="Click to see Previous Comparisons">‹</SlideButton>
                            <Span>Before</Span>
                            <ImageContainer>
                                {images[id]?.before.map(image =>
                                    <OpenModalButton 
                                        id={image.id} 
                                        key={image.id} 
                                        onClick={(e) => ToggleModal(e)}
                                        aria-label="Open Gallery Modal"
                                    >
                                        <GatsbyImg 
                                            image={image.thumb}
                                            alt="Genuine Builders York"
                                        />
                                    </OpenModalButton>
                                )}
                            </ImageContainer>
                            <Span>After</Span>
                            <ImageContainer>
                                {images[id]?.after.map(image =>
                                    <OpenModalButton 
                                        id={image.id} 
                                        key={image.id} 
                                        onClick={(e) => ToggleModal(e)} 
                                        aria-label="Open Gallery Modal"
                                    >
                                        <GatsbyImg 
                                            image={image.thumb}
                                            alt="Genuine Builders York"
                                        />
                                    </OpenModalButton>
                                )}
                            </ImageContainer>
                            <SlideButton onClick={() => ChangeComparisons("right")} aria-label="Click to see Next Comparisons" right>›</SlideButton>
                        </Comparisons>
                    }
                    {images?.length ? 
                        <Grid>
                            {images?.map((image, i) => 
                                <Button 
                                    onClick={(e) => {
                                        hasSwapped(false);
                                        ShowComparisons(e);
                                    }} 
                                    id={image.id ? image.id : ""}
                                    key={image.id ? image.id : ""}
                                    aria-label="View Comparisons"
                                    $active={active && i === id ? true : false}
                                >
                                    <GatsbyImg image={image.after[0].thumb} alt="Genuine Builders York" />
                                </Button>
                            )}
                        </Grid>
                    : 
                        <div style={{ textAlign: "center" }}>
                            <p>Sorry, there aren't any images. Try again later?</p>
                        </div>
                    }
                </MainContent>
                <Modal 
                    ref={modalRef} 
                    gallery={masterArray}
                    index={arrayIndex} 
                    length={masterArray?.length}
                    cache={cachedTab}
                    tabIndex={-1}
                />
            </StyledMain>
        </>
    );
};

const StyledMain = styled.main`
    margin: 1em;

    @media only screen and (max-width: 414px) {
        margin: 0;
    };
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

    @media only screen and (max-width: 414px) {
        margin: 0;
        border-radius: 0;
        box-shadow: none;
        padding: 0em;
    };
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1em;

    @media only screen and (max-width: 560px) {
        grid-template-columns: repeat(2, 1fr);
    };

    @media only screen and (max-width: 414px) {
        margin: 0em 1em;
        padding-bottom: 1em;
    };
`;

const Button = styled.button`
    cursor: pointer;
    padding: 1em;
    background-color: #475159;
    border-style: none;
    border: ${props => props.$active ? "2px solid #a0df6d80" : ""};
    box-shadow: ${props => props.$active ? "0 0 10px #a0df6d80" : ""};
`;

const GatsbyImg = styled(GatsbyImage)`
    vertical-align: middle;
    width: 100%;
    pointer-events: none;
`;

const Comparisons = styled.div`
    display: grid;
    grid-template-columns: 1fr repeat(2, 3fr) 1fr;
    grid-template-rows: 1.5em 1fr;
    margin-bottom: 1em;
    padding: 1em;
    background-color: #475159;
    text-align: center;

    @media only screen and (max-width: 560px) {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, auto) 1fr;
        padding: 0;
        padding-bottom: 1em;
    };
`;

const Span = styled.span`
    color: #a0df6d;
    font-weight: bold;
    margin: 0 0.5em;

    :nth-of-type(1) {
        grid-column: 2;
    };

    @media only screen and (max-width: 560px) {
        margin: 0;
        padding-left: 0;
        padding-right: 0.5em;
        padding-top: 0.75em;
        border-top: 0.75em solid #2a3035;
        grid-row: 2;

        :nth-of-type(1) {
            grid-column: 1;
            padding-left: 0.5em;
            padding-right: 0;
        };
    };

    @media only screen and (max-width: 414px) {
        font-size: 1.15em;
    };
`;

const ImageContainer = styled.div`
    grid-row: 2;
    margin: 0 0.5em;

    @media only screen and (max-width: 560px) {
        grid-row: 3;
        margin-left: 1em;
        margin-right: 0.5em;

        &:nth-of-type(2) {
            margin-left: 0.5em;
            margin-right: 1em;
        };
    };

    @media only screen and (max-width: 414px) {
        margin-left: 1.25em;
        margin-right: 0.5em;

        &:nth-of-type(2) {
            margin-left: 0.5em;
            margin-right: 1.25em;
        };
    };
`;

const OpenModalButton = styled(Button)`
    display: block;
    padding: 0em;
    border: 3px solid #2a3035;
    border-radius: 6px;
    margin: 0.5em auto;
`;

const SlideButton = styled.button`
    background-color: #222222;
    color: #ffffff;
    border-style: none;
    font-size: xx-large;
    font-weight: bold;
    line-height: 0em;
    padding-bottom: 5px;
    border-radius: 0;
    border: 1px solid #ffffff;
    opacity: 0.5;
    cursor: pointer;
    width: 1em;
    grid-row: 2;

    &:hover, &:focus {
        opacity: 0.8;
    };

    &:nth-of-type(2) {
        margin-left: auto;
    };

    @media only screen and (max-width: 560px) {
        width: 100%;
        height: 1.5em;
        grid-row: 1;
    };
`;