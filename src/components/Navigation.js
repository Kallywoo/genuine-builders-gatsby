import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import navBackground from '../images/nav-item-background.png';
import navBackgroundActive from '../images/nav-item-background-active.png';

export const Navigation = () => {

    const activeStyle = { backgroundImage: `url(${navBackgroundActive})`};
    
    return (
        <StyledNavigation>
            <List>
                <ListItem>
                    <StyledLink to="/" activeStyle={activeStyle}>Home</StyledLink>
                </ListItem>
                <ListItem>
                    <StyledLink to="/about" partiallyActive={true} activeStyle={activeStyle}>About Us</StyledLink>
                </ListItem>
                <ListItem>
                    <StyledLink to="/gallery" partiallyActive={true} activeStyle={activeStyle}>Gallery</StyledLink>
                </ListItem>
                <ListItem>
                    <StyledLink to="/contact" partiallyActive={true} activeStyle={activeStyle}>Contact</StyledLink>
                </ListItem>
            </List>
        </StyledNavigation>
    );
};

const StyledNavigation = styled.nav`
    display: flex;
    align-items: center;
    height: 15px;
    background-color: #2a3035;
    justify-content: center;

    @media only screen and (max-width: 414px) {
        background-color: #1f2327;
    };
`;

const List = styled.ul`
    margin: 0;
    margin-left: 12em;

    @media only screen and (max-width: 768px) {
        margin-left: 0;
        padding: 0;
    };

    @media only screen and (max-width: 560px) {
        display: none;
    };
`;

const ListItem = styled.li`
    display: inline-flex;
    margin: 0em 0.5em;
    text-align: center;
    border-radius: 3px;
    box-shadow: 3px 3px 3px #333333;
`;

const StyledLink = styled(Link)`
    background-image: url(${navBackground});
    background-size: 100% 100%;
    color: #a8dc7e;
    text-decoration: none;
    min-width: 7em;
    padding: 0.8ex 1ex;
    
    &:hover {
        background-image: url(${navBackgroundActive});
    };
`;
