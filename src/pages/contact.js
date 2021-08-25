import React from 'react';
import styled from 'styled-components';

import { ContactForm } from '../components/ContactForm';
import screw from '../images/temp/screwBulletSmall.png';

export default function Contact() {
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
                <FlexBox>
                    <ContactInfo>
                        <Name>Office</Name>
                        <Number href="tel:01904-708-121">01904 708 121</Number>
                        <Name>Mat Lynch</Name>
                        <Number href="tel:07769-708-388">07769 708 388</Number>
                        <Email href="mailto:mat@genuinebuilders.co.uk">mat@genuinebuilders.co.uk</Email>
                    </ContactInfo>
                    <ContactForm/>
                </FlexBox>
            </MainContent>
        </StyledMain>
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
    }
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

const FlexBox = styled.div`
    display: flex;
    
    @media only screen and (max-width: 768px) {
        flex-direction: column;
    }
`;

const ContactInfo = styled.div`
    width: 50%;
    @media only screen and (max-width: 768px) {
        width: 100%;
        padding: 1em;
        padding-top: 0em;
    }
`;

const Name = styled.p`
    margin-bottom: 0;
    color: #a0df6d;
    font-weight: bold;
`;

const Number = styled.a`
    text-decoration: none;
    color: #8cde97;
`;

const Email = styled.a`
    display: block;
    text-decoration: none;
    color: white;
    margin-top: 4em;
    @media only screen and (max-width: 768px) {
        margin-top: 1em;
    }
`;