import React, { useState, useRef, useEffect } from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import { Modal } from "../components/Modal";
import SEO from '../components/SEO';

import screw from '../images/screw.png';

export const data = graphql`
    query {
        contentfulArticleHeader {
            id
            list
        }
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

    const { list } = data.contentfulArticleHeader;
    const { images } = data.contentfulImageGallery;

    const [masterArray, setMasterArray] = useState([]);

    const [active, setActive] = useState(false);
    const [id, setId] = useState(0);

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
        if (active) {
            containerRef.current.focus(); // sets focus on comparisons box
        };
    }, [active, id]);

    const ShowComparisons = (e) => { // opens comparisons box
        setActive(true);
        if (e.target.id && e.target.id !== id) { // does the clicked container have an ID and is it a different one to previous click?
            setId(images.findIndex((element) => element.id === e.target.id)); // finds the project with same id as clicked for render to know which index is the object that contains the specific before/afters
        } else if (!e.target.id) { // if there is no id
            console.error("no id found for this image!");
        };
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
                    <List aria-hidden="true">
                        {list.map((item, i) => 
                            <ListItem key={`${list.id}-${i}`}>{item}</ListItem>
                        )}
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
                                        <GatsbyImg 
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
                                        <GatsbyImg 
                                            image={image.thumb}
                                            alt="Genuine Builders York"
                                        />
                                    </OpenModalButton>
                                )}
                            </ComparisonContainer>
                        </Comparisons>
                    }
                    {images.length ? 
                        <Grid>
                            {images?.map(image => 
                                <Button 
                                    onClick={ShowComparisons} 
                                    id={image.id ? image.id : ""}
                                    key={image.id ? image.id : ""}
                                    aria-label="View Comparisons"
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

const List = styled.ul`
    list-style-type: none;
    margin: 0 auto;
    margin-bottom: 1em;
    padding: 0;
    max-width: 395px;
    text-align: center;

    @media only screen and (max-width: 768px) {
        display: none;
    };
`;

const ListItem = styled.li`
    display: inline;
    color: #a0df6d;
    font-size: small;
    white-space: nowrap;

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
    text-decoration: underline;

    @media only screen and (max-width: 414px) {
        font-size: x-large;
    };
`;

const OpenModalButton = styled(Button)`
    display: block;
    padding: 0em;
    border: 3px solid #2a3035;
    border-radius: 6px;
    margin: 0.5em 0em;
`;
