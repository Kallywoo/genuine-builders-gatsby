import React from 'react';
import styled from 'styled-components';

import certificate from '../images/temp/liability.png';

export default function Liability() {
    return (
        <StyledMain>
            <Image src={certificate} alt="Liability Insurance Certificate"/>
        </StyledMain>
    );
};

const StyledMain = styled.main`
    max-width: 780px;
    margin: 2em auto;
    padding: 1em 2em;
    background-color: #2a3035;
    border-radius: 10px;
    box-shadow: 5px 5px 5px #333333;
    text-align: center;
`;

const Image = styled.img`
    width: auto;
`;