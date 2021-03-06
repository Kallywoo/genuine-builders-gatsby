import React, { useState } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import iconOpen from '../images/mobile-nav-open.png';
import iconClose from '../images/mobile-nav-close.png';

export const MobileNavigation = () => {

    const [open, setOpen] = useState(false);
    
    let timeout = null;

    const onBlurHandler = () => {
        timeout = setTimeout(() => {
            setOpen(false);
        });
    };

    const onFocusHandler = () => {
        clearTimeout(timeout);
    };

    const activeStyle = { opacity: "0.5" };

    return (
        <>
            {open && 
                <Backdrop visible={open} onClick={() => setOpen(false)} />
            }
            <MobileHeader onBlur={() => onBlurHandler()} onFocus={() => onFocusHandler()}>
                <Button onClick={() => setOpen(!open)} aria-label={!open ? `Open Navigation` : `Close Navigation`}>
                    <Hamburger src={open ? iconClose : iconOpen} alt="" />
                </Button>
                {open &&
                    <nav>
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
                    </nav>
                }
            </MobileHeader>
        </>
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
        z-index: 1;
    };
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
    };
`;

const List = styled.ul`
    list-style-type: none;
    padding-left: 1em;
    margin-top: 0.5em;
    margin-bottom: 0.25em;
`;

const ListItem = styled.li`
    line-height: 3.125em;
`;

const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
    font-size: 1.75em;
    font-weight: bold;
    text-shadow: 1px 1px grey;
`;

const Backdrop = styled.div`
    display: ${props => props.visible ? "block" : "none"};
    position: fixed;
    background-color: rgba(0,0,0,0.5);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
`;
