import React from 'react';
import styled from 'styled-components';
import screw from '../images/temp/screwBulletSmall.png';

import { Reviews } from '../components/Reviews.js';
import { Carousel } from '../components/Carousel.js';

// if Twitter follow button and/or timeline is wanting to be kept
// https://www.gatsbyjs.com/plugins/gatsby-plugin-twitter/

export default function Main() {
    return (
        <StyledMain>
            <MainContent>
                <List>
                    <ListItem>Extensions</ListItem>
                    <ListItem>Property Repairs</ListItem>
                    <ListItem>Conversions</ListItem>
                    <ListItem>External Works</ListItem>
                    <ListItem>Business premises maintained</ListItem>
                </List>
                <Carousel duration="5000"/>
                <Text>Genuine Builders serves the North Yorkshire community.</Text>
                <Text>We specialize in Design / Building, and we offer an exceptional and reliable service. In addition, our friendly and professional staff are here to answer any questions you may have about our company or our services.</Text>
                <Text>Whatever type of building work you require, at Genuine Builders our goal is to provide you with a courteous, expedient, and professional service of the highest calibre.</Text>
                <Text>If you have any questions or would like to contact us, please e-mail us at <Contact href="mailto:info@genuinebuilders.co.uk">info@genuinebuilders.co.uk</Contact> or call us at <Contact href="tel:01904-708-121">01904 708 121</Contact>.</Text>
                <Motto>At Genuine Builders, the customer always comes first</Motto>
                <SecondaryContent>
                    <Reviews fade="1000" duration="5000"/>
                    <Guarantee>We always perform to the highest standard. The testimonials above show that we always get 100% satisfaction from our customers and do our utmost to please.</Guarantee>
                </SecondaryContent>
                {/* <Twitter>Tweets by GenuineBuilders</Twitter> */}
            </MainContent>
        </StyledMain>
    )
};

const StyledMain = styled.main`
    margin: 1em;
`;

const MainContent = styled.div`
    max-width: 780px;
    margin: 2em auto;
    padding: 1em 2em;
    background-color: #2a3035;
    border-radius: 10px;
    box-shadow: 5px 5px 5px #333333;
    @media only screen and (max-width: 560px) {
        padding: 1em;
    }
`;

const List = styled.ul`
    list-style-type: none;
    margin: 0 auto;
    padding: 0;
    max-width: 39ex;
    text-align: center;
    @media only screen and (max-width: 768px) {
        display: none;
    }
`;

const ListItem = styled.li`
    display: inline;
    color: #a0df6d;
    font-size: small;
    &:before {
        margin: 1ex;
        content: url(${screw});
    }
    &:nth-child(odd) {
        color: #52af07;
    }
    &:nth-child(3):after {
        margin: 1ex;
        content: url(${screw});
    }
    &:nth-child(5):after {
        margin: 1ex;
        content: url(${screw});
    }
`;

const Text = styled.p`
    margin: 0;
`;

const Contact = styled.a`
    text-decoration: none;
    font-weight: bold;
    color: lightgreen;
`;

const Motto = styled.h3`
    color: white;
    text-align: center;
    font-weight: normal;
`;

const SecondaryContent = styled.div`
    /* display: inline-block; */
    /* width: 40%; */
    
    /* remove below (except media query), uncomment above 
    for layout w/ twitter timeline */
    display: block;
    width: 90%;
    text-align: center;
    margin: 0 auto;
    @media only screen and (max-width: 560px) {
        width: 100%;
        padding: 0em 0.5em;
    }
`;

const Guarantee = styled.p`
    background-color: #475159;
    padding: 1em;
    @media only screen and (max-width: 560px) {
        display: none;
    }
`;

// const Twitter = styled.a`
//     width: 50%;
//     vertical-align: top;
//     color: white;
// `;