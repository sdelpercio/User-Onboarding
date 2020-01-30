import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import {
    PageWrapper,
    Title,
    Label,
    StyledInlineErrorMessage,
    Submit,
    Input
  } from "./styles";

const Onboarding = ({ errors, touched, status }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        status && setUsers(users => [...users, status]);
    }, [status])

    return (
        <div>
            <Title>Sign Up</Title>
            <Form>
                <Label>
                    Name:
                    <Input type='text' name='name' />
                    { touched.name && errors.name && (
                        <StyledInlineErrorMessage className='errors'>{ errors.name }</StyledInlineErrorMessage>
                    ) }
                </Label>
                <Label>
                    Email:
                    <Input type='email' name='email' />
                    { touched.email && errors.email && (
                        <StyledInlineErrorMessage className='errors'>{ errors.email }</StyledInlineErrorMessage>
                    ) }
                </Label>
                <Label>
                    Password:
                    <Input type='password' name='password' />
                    { touched.password && errors.password && (
                        <StyledInlineErrorMessage className='errors'>{ errors.password }</StyledInlineErrorMessage>
                    ) }
                </Label>
                <Label>
                    <Field type='checkbox' name='tos' />
                    <span>Terms of Service (Check to agree)</span>
                    { errors.tos && (
                        <StyledInlineErrorMessage className='errors'>{ errors.tos }</StyledInlineErrorMessage>
                    ) }
                </Label>
                <Submit type='submit' >Submit</Submit>
            </Form>
            <PageWrapper>
                <Title>Users</Title>
                {
                    users.map(user => (
                        <ul key={user.password}>
                            <li>Name: {user.name}</li>
                            <li>Email: {user.email}</li>
                        </ul>
                    ))
                }
            </PageWrapper>
        </div>
    )
}

const FormikOnboarding = withFormik({
    mapPropsToValues({ name, email, password, tos }) {
        return {
            name: '',
            email: '',
            password: '',
            tos: false
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup
        .string()
        .max(15, 'Name can be no more than 15 characters long')
        .required(),
        email: Yup.string().email().required(),
        password: Yup
        .string()
        .min(6, 'Password must be at least 6 characters long')
        .required(),
        tos: Yup.boolean().oneOf([true], 'Must Accept Terms and Conditions')
    }),
    handleSubmit(values, {setStatus, resetForm}) {
        console.log('submitting', values);
        axios.post('https://reqres.in/api/users', values)
        .then(res => {
            console.log('response', res)
            setStatus(res.data);
            resetForm();
        })
        .catch(err => {
            console.log('failure', err)
        })
    }
})(Onboarding);
export default FormikOnboarding