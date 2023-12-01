import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { toast } from 'react-toastify';
import { auth, googleAuthProvider } from "../../firebase";
import { sendSignInLinkToEmail, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {
    MailOutlined,
    GoogleOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [email, setEmail] = useState('bdzebel@gmail.com');
    const [password, setPassword] = useState('12345678');
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector(state => ({ ...state }))

    useEffect(() => {
        if (user && user.token) navigate('/')
    }, [user, navigate])

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)

        console.table(email, password);
        signInWithEmailAndPassword(auth, email, password).then(async (result) => {
            console.log('result: ', result);
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();

            dispatch({
                type: 'LOGGED_IN_USER',
                payload: {
                    email: user.email,
                    token: idTokenResult.token
                }
            })

            navigate('/')
        }).catch(error => {
            console.log('error: ', error);
            toast.error(error.message);
            setLoading(false)
        })


    }

    const googleLogin = () => {
        signInWithPopup(auth, googleAuthProvider).then(async (result) => {
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();
            dispatch({
                type: 'LOGGED_IN_USER',
                payload: {
                    email: user.email,
                    token: idTokenResult.token
                }
            })

            navigate('/')

        }).catch(error => {
            console.log('error: ', error);
            toast.error(error.message);
            setLoading(false)
        })
    }
    const loginForm = () => <form onSubmit={handleSubmit}>
        <div className="form-group">
            <input
                type="email"
                className="form-control"
                value={email}
                onChange={event => setEmail(event.target.value)}
                placeholder="Your email"
                autoFocus
            />
        </div>

        <div className="form-group">
            <input
                type="password"
                className="form-control"
                value={password}
                onChange={event => setPassword(event.target.value)}
                placeholder="Your password"

            />
        </div>

        <br />
        <Button
            onClick={handleSubmit}
            type="primary"
            className="mb-3"
            shape="round"
            block
            icon={<MailOutlined />}
            size="large"
            disabled={!email || password.length < 6}
        >
            Login with Email/Password</Button>
    </form>
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {!loading ?
                        <h4>Login</h4> :
                        <h4 className="text-danger">Loading...</h4>}
                    {loginForm()}
                    <Button
                        onClick={googleLogin}
                        type="primary"
                        danger
                        className="mb-3"
                        shape="round"
                        block
                        icon={<GoogleOutlined />}
                        size="large"
                    // disabled={!email || password.length < 6}
                    >
                        Login with Google
                    </Button>
                    <Button
                        className="float-right"
                        onClick={() => navigate('/forgot/password')}
                        type="link"
                        danger
                    >
                        Forgot Password
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Login;