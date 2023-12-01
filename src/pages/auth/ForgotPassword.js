import React, { useEffect, useState } from "react";

import { toast } from 'react-toastify';
import { auth } from "../../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";



const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const { user } = useSelector(state => ({ ...state }))

    useEffect(() => {
        if (user && user.token) navigate('/')
    }, [user, navigate])

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true)

        const config = {
            // url: 'http://localhost:3000/register/complete',
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true,
        }
        sendPasswordResetEmail(auth, email, config).then(() => {
            console.log('doing send password work: ');
            setEmail('');
            setLoading(false);
            toast.success('Check your email for password reset link');
        }).catch(error => {
            setLoading(false)
            toast.error(error.message)
            console.log('Error msg in forgot password: ', error);
        })
    }
    return (
        <div className="container col-md-6 offset-md-3 p-5">
            {loading ? <h4 className="text-danger">Loading</h4> : <h4>Forgot Password</h4>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Type your email"
                    autoFocus
                />
                <br />
                <button className="square border border-1" disabled={!email}>Submit</button>
            </form>

        </div>
    );
}

export default ForgotPassword;