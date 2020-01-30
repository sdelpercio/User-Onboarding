import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

const Onboarding = ({ values, errors, touched }) => {
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
                </label>
                <button type='submit' >Submit</button>
            </Form>
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
    }),
    handleSubmit(values, formikBag) {
        console.log('submitting', values);
    }
})(Onboarding);
export default FormikOnboarding