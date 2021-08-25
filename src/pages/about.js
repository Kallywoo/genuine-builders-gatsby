import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import screw from '../images/temp/screwBulletSmall.png';
import image from '../images/temp/Home6.png'

export default function About() {
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
                <Header>About Us</Header>
                <p>Genuine Builders is a small friendly Company, which is run by a father and son team, whereby the father implements many years of experience while the son oversees the day to day running of the projects and contributes modern ideas, which can create a contemporary finish to our work. The name GENUINE BUILDERS was established in 1995.</p>
                <p>We wanted the title of the company to openly describe ourselves, our company and most importantly our intensions towards our customers.</p>
                <p>At Genuine Builders we offer the highest quality in design and build on the market today. We have provided superior services to our customers and have assisted them in achieving their goals. Our years of experience and commitment to excellence have earned us a fantastic reputation. At Genuine Builders nothing is too much trouble, we do not have problems, we only have solutions.</p>
                <Image src={image} alt="Genuine Builders York vehicles"/>
                <Header>Our Values</Header>
                <p><Category>Commitment: </Category> 
                We start on time and finish on time. We produce total satisfaction which is what you should expect from a trustful and reliable builder, while working in your home.</p>
                <p><Category>Customer Relations: </Category> 
                At Genuine Builders, our highest priority is satisfied customers. You are important to us and you can expect us to go that extra mile for your requirements. Superior customer service is the hallmark of Genuine Builders. We are proud to serve you and work hard to earn your business.</p>
                <p><Category>Leadership: </Category> 
                At Genuine Builders, you receive the kind of quality and service you expect from a leader. Our company is always evolving as the needs of our customers change. You can rest assured that, working with Genuine Builders, you will enjoy the latest technology and specifications.</p>
                <p><Category>External Assurances: </Category> 
                All our work is always inspected and passed by the local authorities i.e. by the building inspectors from the City of York Council or by the local authorities building inspectors. We are an active member of the Federation of the Master Builders. This is an organization that is committed to stamp our cowboy builders and gives 100% backing towards their members to provide high standards of work and therefore ensure customer satisfaction.</p>
                <p><Category>Teamwork: </Category> 
                We make it our responsibility to know you and your requirements. We work closely with you to ensure that the solutions we provide are tailored to meet your unique needs and challenges.</p>
                <LiabilityLink to="/liability">Click here to view our liability insurance certificate</LiabilityLink>
                <Image src={image} alt="Genuine Builders York vehicles"/>
                <Summary>
                    <Header>'In a Nutshell'</Header>
                    <Want>If you want a builder that starts and finishes on time.</Want>
                    <Want>A builder that you and your family feel comfortable with, while working in your home.</Want>
                    <Want>A company that completes the project leaving you completely satisfied.</Want>
                    <Assurance>Then we are the builders for you.</Assurance>
                </Summary>
                <Motto>At Genuine Builders, the customer always comes first</Motto>
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

const Header = styled.h3`
    color: #52af07;
`;

const Image = styled.img`
    width: 100%;
    margin: 1em 0em;
`;

const Category = styled.span`
    color: white;
`;

const LiabilityLink = styled(Link)`
    display: block;
    color: white;
    text-align: center;
    text-decoration: none;
`;

const Summary = styled.div`
    background-color: #475159;
    padding: 1em 2em;
`;

const Want = styled.p`
    color: #aeca97;
`;

const Assurance = styled.p`
    color: #a0df6d;
`;

const Motto = styled.h3`
    color: white;
    text-align: center;
    font-weight: normal;
`;