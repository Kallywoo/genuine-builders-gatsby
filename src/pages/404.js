import * as React from "react"
import { Link } from "gatsby"
import styled from 'styled-components';

export default function NotFoundPage() {
    return (
        <StyledMain>
            <MainContent>
                <title>Not found</title>
                <H1>Page not found</H1>
                <Paragraph>
                    Sorry{" "}
                    <span role="img" aria-label="Pensive emoji">
                    😔
                    </span>{" "}
                    we couldn’t find what you were looking for.
                    <br />
                    {process.env.NODE_ENV === "development" ? (
                    <>
                        <br />
                        Try creating a page in <Code>src/pages/</Code>.
                        <br />
                    </>
                    ) : null}
                    <br />
                    <StyledLink to="/">Go home</StyledLink>.
                </Paragraph>
            </MainContent>
        </StyledMain>
    );
};

const StyledMain = styled.main`
    color: #232129;
    padding: 96px;
    margin: 1em;

    @media only screen and (max-width: 414px) {
        margin: 0;
    };
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
    };

    @media only screen and (max-width: 414px) {
        margin: 0;
        border-radius: 0;
        box-shadow: none;
        padding: 0em;
    };
`;

const H1 = styled.h1`
    margin-top: 0;
    margin-bottom: 64px;
    max-width: 320px;
    color: #52af07;
`;

const Paragraph = styled.p`
    margin-bottom: 48px;
`;

const Code = styled.code`
    color: #8A6534;
    padding: 4px;
    background-color: #FFF4DB;
    font-size: 1.25rem;
    border-radius: 4px;
`;

const StyledLink = styled(Link)`
    font-weight: bold;
    color: lightgreen;
`;