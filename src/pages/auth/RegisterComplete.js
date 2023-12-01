import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { auth } from "../../firebase";
import { getIdTokenResult, signInWithEmailLink, updatePassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";


const RegisterComplete = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForReg'));
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error('Email and password is required');
            return;
        }
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long')
            return;
        }
        try {
            signInWithEmailLink(auth, email, window.location.href)
                .then(async (result) => {
                    console.log('successful sign in: ', result);
                    if (result.user.emailVerified) {
                        // remove user email from local storage
                        window.localStorage.removeItem('emailForReg');
                        // get user id token
                        let user = auth.currentUser;
                        await updatePassword(user, password);
                        const idTokenResult = await getIdTokenResult(user);
                        console.log(`user: ${user}`);
                        console.log(`idTokenResult: ${idTokenResult}`);
                        // redux store

                        // redirect
                        navigate('/');
                    }

                }).catch(error => {
                    console.log('error complete reg: ', error);
                    toast.error(error.message);
                });
        } catch (error) {
            console.log('error complete reg: ', error);
            toast.error(error.message);
        }


    }
    const completeRegistrationForm = () => <form onSubmit={handleSubmit}>
        <input
            type="email" className="form-control" value={email} disabled />
        <div style={{ height: 20 }} />
        <input
            type="password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoFocus
            placeholder="Enter your password"
        />
        <div style={{ height: 20 }} />
        <button type="submit" className="square border border-1">Complete Registration</button>
    </form>
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register Complete</h4>
                    {completeRegistrationForm()}

                </div>
            </div>
        </div>
    );
}

export default RegisterComplete;