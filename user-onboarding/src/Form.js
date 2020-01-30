import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Onboarding = ({ errors, touched, status }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        status && setUsers(users => [...users, status]);
    }, [status])

    return (
        <div>
            <Form>
                <label>
                    Name:
                    <Field type='text' name='name' />
                    { touched.name && errors.name && (
                        <p className='errors'>{ errors.name }</p>
                    ) }
                </label>
                <label>
                    Email:
                    <Field type='email' name='email' />
                    { touched.email && errors.email && (
                        <p className='errors'>{ errors.email }</p>
                    ) }
                </label>
                <label>
                    Password:
                    <Field type='password' name='password' />
                    { touched.password && errors.password && (
                        <p className='errors'>{ errors.password }</p>
                    ) }
                </label>
                <label>
                    <Field type='checkbox' name='tos' />
                    Terms of Service (Check to agree)
                    { errors.tos && (
                        <p className='errors'>{ errors.tos }</p>
                    ) }
                </label>
                <button type='submit' >Submit</button>
            </Form>
            <div>
                <h1>Users</h1>
                {
                    users.map(user => (
                        <ul key={user.password}>
                            <li>Name: {user.name}</li>
                            <li>Email: {user.email}</li>
                        </ul>
                    ))
                }
            </div>
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