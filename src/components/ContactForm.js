import React, { useState } from 'react';
import styled from 'styled-components';

export const ContactForm = () => {

    // https://dev.to/deboragaleano/how-to-handle-multiple-inputs-in-react-55el

    const initialValues = {
        name: "",
        email: "",
        phone: "",
        message: "",
    };

    const [values, setValues] = useState(initialValues);

    const handleInputChange = e => {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSubmit = e => {
        e.preventDefault();

        // could do with a check for whether one or both entries for email/phone has been entered
        // instead of making both required?

        // actions for submitting stuff
    };

    const handleReset = () => {
        setValues(initialValues);
    };

    return (
        <StyledForm onSubmit={handleSubmit}>
            <ContactUs>Contact us</ContactUs>
            <Fieldset>
                <Label htmlFor="name">
                    Name:
                    <Input 
                        name="name" 
                        type="text"
                        id="name"
                        value={values.name}
                        onChange={handleInputChange}
                        required
                    />
                </Label>
                <Label htmlFor="email">
                    E-mail address:
                    <Input 
                        name="email"
                        type="email"
                        id="email"
                        value={values.email}
                        onChange={handleInputChange}
                        required
                    />
                </Label>
                <Label htmlFor="phone">
                    Contact number:
                    <Input 
                        name="phone" 
                        type="tel"
                        id="phone"
                        value={values.phone}
                        onChange={handleInputChange}
                        pattern="^\s*\(?(020[7,8]{1}\)?[ ]?[1-9]{1}[0-9{2}[ ]?[0-9]{4})|(0[1-8]{1}[0-9]{3}\)?[ ]?[1-9]{1}[0-9]{2}[ ]?[0-9]{3})\s*$"
                        required
                    />
                </Label>
                <Label htmlFor="message">
                    Message:
                    <TextArea 
                        name="message" 
                        type="text"
                        id="message"
                        value={values.message}
                        onChange={handleInputChange}
                        required
                    />
                </Label>
                <Button type="reset" onClick={handleReset}>Reset</Button>
                <Button type="submit">Submit</Button>
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
    }
`;

const ContactUs = styled.h3`
    margin-top: 0em;
    margin-bottom: 0.5em;
    color: #8cde97;
    font-size: x-large;
`;

const Fieldset = styled.fieldset`
    text-align: right;
    border-style: none;
    @media only screen and (max-width: 768px) {
        padding: 0;
    }
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
    }
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
    }
    @media only screen and (max-width: 768px) {
        display: block;
        width: 100%;
        margin-left: 0;
        margin-top: 0.5em;
    }
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
    }
    @media only screen and (max-width: 768px) {
        display: block;
        width: 100%;
        margin-left: 0;
        margin-top: 0.5em;
    }
`;

const Button = styled.button`
    cursor: pointer;
    border-radius: 4px;
    border: 1px solid #8cde97;
    background: #2A3035;
    color: #8cde97;
    padding: 0.4em 1.3em;
    margin-left: 2em;
    &:hover {
        background: gray;
        color: black;
    }
`;