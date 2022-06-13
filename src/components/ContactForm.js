import React, { useState } from 'react';
import styled from 'styled-components';

import loadingIcon from '../images/spinner.svg';

export const ContactForm = () => {

    // https://dev.to/deboragaleano/how-to-handle-multiple-inputs-in-react-55el

    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const initialValues = {
        name: "",
        email: "",
        phone: "",
        message: "",
        boop: ''
    };

    const [values, setValues] = useState(initialValues);

    const handleInputChange = e => {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const body = {
            ...values,
            RECIPIENT: process.env.SES_RECIPIENT.split(","),
            subject: "****JOB ENQUIRY****"
        };

        // console.log(body);

        const res = await fetch(`${process.env.API_ENDPOINT}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const text = JSON.parse(await res.text());

        if(res.status >= 400 && res.status < 600) {
            setLoading(false);
            setMessage(''); // clears message if user has already successfully submitted once before an error
            setError(text.message);
        } else {
            // it worked!
            setLoading(false);
            setError(''); // clears message if user has successfully submitted after an error
            setMessage('Email successfully sent!');
            handleReset();
        };
    };

    const handleReset = () => {
        setValues(initialValues);
    };

    return (
        <StyledForm onSubmit={handleSubmit}>
            <ContactUs>Contact us</ContactUs>
            <Fieldset disabled={loading}>
                <Label>
                    Name:
                    <Input 
                        name="name" 
                        type="text"
                        value={values.name}
                        onChange={handleInputChange}
                        required
                    />
                </Label>
                <Label>
                    E-mail address:
                    <Input 
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleInputChange}
                        required
                    />
                </Label>
                <Label>
                    Contact number:
                    <Input 
                        name="phone" 
                        type="tel"
                        value={values.phone}
                        onChange={handleInputChange}
                        pattern="^\s*\(?(020[7,8]{1}\)?[ ]?[1-9]{1}[0-9{2}[ ]?[0-9]{4})|(0[1-8]{1}[0-9]{3}\)?[ ]?[1-9]{1}[0-9]{2}[ ]?[0-9]{3})\s*$"
                        required
                    />
                </Label>
                <Label>
                    Message:
                    <TextArea 
                        name="message" 
                        type="text"
                        value={values.message}
                        onChange={handleInputChange}
                        required
                    />
                    <Input 
                        name="boop"
                        type="boop"
                        value={values.boop}
                        onChange={handleInputChange}
                        className="boop"
                    />
                </Label>
                <Button type="reset" onClick={handleReset} disabled={loading}>Reset</Button>
                <Button type="submit" disabled={loading}>
                    {loading ? <img src={loadingIcon} alt="Submitting" /> : 'Submit'}
                </Button>
                <div aria-live="polite" role="status">
                    {message ? <p>{message}</p> : ''}
                </div>
                <div aria-live="assertive">
                    {error ? <RedError>Error: {error}</RedError> : ''}
                </div>
            </Fieldset>
        </StyledForm>
    );
};

const StyledForm = styled.form`
    background-color: #475159;
    text-align: center;
    border-radius: 5px;
    padding: 1em;
    width: 50%;

    @media only screen and (max-width: 768px) {
        width: 100%;
    };
`;

const ContactUs = styled.h3`
    margin-top: 0em;
    margin-bottom: 0.5em;
    color: #8cde97;
    font-size: x-large;

    @media only screen and (max-width: 414px) {
        font-size: xx-large;
    };
`;

const Fieldset = styled.fieldset`
    text-align: right;
    border-style: none;

    @media only screen and (max-width: 768px) {
        padding: 0;
    };

    @media only screen and (max-width: 414px) {
        text-align: center;
    };
`;

const Label = styled.label`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 1em;
    color: white;

    @media only screen and (max-width: 768px) {
        flex-flow: wrap;
        justify-content: flex-start;
    };
`;

const Input = styled.input`
    width: 58%;
    height: 2em;
    margin-left: 1em;
    border: 1px solid #cccccc;
    border-radius: 4px;
    color: #555555;
    box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
    transition: border linear 0.2s, box-shadow linear 0.2s;

    &:focus {
        outline: none;
        border-color: rgba(82, 168, 236, 0.8);
        box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%), 0 0 8px rgb(82 168 236 / 60%);
    };

    &.boop {
        display: none;
    };

    &:disabled {
        opacity: 0.5;
    };

    @media only screen and (max-width: 768px) {
        display: block;
        width: 100%;
        margin-left: 0;
        margin-top: 0.5em;
        font-size: large;
    };
`;

const TextArea = styled.textarea`
    resize: none;
    width: 58%;
    height: 6em;
    margin-left: 1em;
    vertical-align: middle;
    border: 1px solid #cccccc;
    border-radius: 4px;
    color: #555555;
    box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
    transition: border linear 0.2s, box-shadow linear 0.2s;

    &:focus {
        outline: none;
        border-color: rgba(82, 168, 236, 0.8);
        box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%), 0 0 8px rgb(82 168 236 / 60%);
    };

    &:disabled {
        opacity: 0.5;
    };

    @media only screen and (max-width: 768px) {
        display: block;
        width: 100%;
        margin-left: 0;
        margin-top: 0.5em;
        font-size: large;
    };
`;

const Button = styled.button`
    cursor: pointer;
    border-radius: 4px;
    border: 1px solid #8cde97;
    background: #2A3035;
    color: #8cde97;
    padding: 0.4em 1.3em;
    margin-left: 2em;
    vertical-align: middle;

    img {
        display: block;
        width: 16px;
    };

    &:hover {
        background: gray;
        color: black;
    };

    &:disabled {
        ${props => props.type === 'submit' ? 'padding: 0.36em 1.7em' : ''};
        border-color: #517d5b;
        color: #517d5b;
        cursor: default;

        &:hover {
            background: #2A3035;
        };
    };

    @media only screen and (max-width: 767px) {
        font-size: large;
    };

    @media only screen and (max-width: 414px) {
        margin-top: 1em;
        margin-left: 1em;
        margin-right: 1em;
    };
`;

const RedError = styled.p`
    color: red;
`;
