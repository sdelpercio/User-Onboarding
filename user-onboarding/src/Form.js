import React from 'react';
import { withFormik, Form, Field } from 'formik';

const Onboarding = () => {
    return (
        <div>
            <Form>
                <label>
                    Name:
                    <Field type='text' name='name' />
                </label>
                <label>
                    Email:
                    <Field type='email' name='email' />
                </label>
                <label>
                    Password:
                    <Field type='password' name='password' />
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
    }
})(Onboarding);
export default FormikOnboarding