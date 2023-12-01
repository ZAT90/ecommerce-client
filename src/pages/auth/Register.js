import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { auth } from "../../firebase";
import { sendSignInLinkToEmail } from "firebase/auth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Register = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const { user } = useSelector(state => ({ ...state }))

    useEffect(() => {
        if (user && user.token) navigate('/')
    }, [user, navigate])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('start submit reg 1: ', process.env.REACT_APP_REGISTER_REDIRECT_URL);
        const config = {
            // url: 'http://localhost:3000/register/complete',
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true,
        }

        console.log('start submit reg 2');

        sendSignInLinkToEmail(auth, email, config)
            .then(() => {

                toast.success(`Email is sent to ${email}. Click the link to complete your registration`, {
                    position: toast.POSITION.TOP_RIGHT,
                })
                // save user email in local storage
                window.localStorage.setItem('emailForReg', email);
                //clear state
                setEmail('')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`errorCode: ${errorCode}`);
                console.log(`errorMessage: ${errorMessage}`);
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
            placeholder="Your Email"
            autoFocus
        />
        <br />
        <button type="submit" className="square border border-1">Register</button>
    </form>
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    {registerForm()}

                </div>
            </div>
        </div>
    );
}

export default Register;