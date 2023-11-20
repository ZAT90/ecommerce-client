import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import { auth } from "../../firebase";
import { sendSignInLinkToEmail } from "firebase/auth";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            url: 'http://localhost:3000/register/complete',
            handleCodeInApp: true,
        }

        sendSignInLinkToEmail(auth, email, config)
            .then(() => {

                toast.success(`Email is sent to ${email}. Click the link to complete your registration`, {
                    position: toast.POSITION.TOP_RIGHT,
                })
                // save user email in local storage
                window.localStorage.setItem('emailForSignIn', email);
                //clear state
                setEmail('')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ...
            });
        // await sendSignInLinkToEmail(auth, email, config);
        // toast.success(`Email is sent to ${email}. Click the link to complete your registration`)

        // // save user email in local storage
        // window.localStorage.setItem('emailForRegistration', email);
    }
    const registerForm = () => <form onSubmit={handleSubmit}>
        <input
            type="email"
            className="form-control"
            value={email}
            onChange={event => setEmail(event.target.value)}
            autoFocus
        />
        <div style={{ height: 20 }} />
        <button type="submit" className="square border border-1">Register</button>
    </form>
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    <ToastContainer />
                    {registerForm()}
                   
                </div>
            </div>
        </div>
    );
}

export default Register;