import React, { useState } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import navButton from '../images/temp/mobileNavButton.png';

export const MobileNavigation = () => {

    const [isNavOpen, setIsNavOpen] = useState(false);

    return (
        <MobileHeader>
            <Button onClick={() => setIsNavOpen(!isNavOpen)}><Hamburger src={navButton} alt=""/></Button>
            {isNavOpen &&
                <nav>
                    <List>
                        <ListItem><StyledLink to="/">Home</StyledLink></ListItem>
                        <ListItem><StyledLink to="/about">About Us</StyledLink></ListItem>
                        <ListItem><StyledLink to="/gallery">Gallery</StyledLink></ListItem>
                        <ListItem><StyledLink to="/contact">Contact</StyledLink></ListItem>
                    </List>
                </nav>
            }
        </MobileHeader>
    );
};

const MobileHeader = styled.div`
    display: none;
    @media only screen and (max-width: 560px) {
        display: block;
        padding: 0.5em;
        position: fixed;
        background-color: #1f2327;
        text-align: left;
        width: 100%;
        top: 0;
        left: 0;
        box-shadow: 0 1px 5px #1c1c1c;
    }
`;

const Button = styled.button`
    padding: 0;
    border: none;
    background-color: transparent;
    vertical-align: middle;
`;

const Hamburger = styled.img`
    display: block;
    width: 100%;
    &:active {
        opacity: 75%;
        border-radius: 5px;
        background-color: black;
    }
`;

const List = styled.ul`
    list-style-type: none;
    padding-left: 1em;
`;

const ListItem = styled.li`
    margin-top: 1em;
`;

const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
    font-size: 2em;
    font-weight: bold;
    text-shadow: 1px 1px grey;
`;