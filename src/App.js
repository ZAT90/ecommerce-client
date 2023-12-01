import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';



import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Header from "./components/nav/Header";
import RegisterComplete from "./pages/auth/RegisterComplete";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import ForgotPassword from "./pages/auth/ForgotPassword";



const App = () => {
  const dispatch = useDispatch();

  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log('user: ', user);
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            email: user.email,
            token: idTokenResult.token
          }
        })

      }
    });
    return () => unsubscribe()
  }, [])
  return (
    <>
      <Header />
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/register/complete" element={<RegisterComplete />} />
        <Route exact path="/forgot/password" element={<ForgotPassword />} />
      </Routes>

    </>
  );
}


  ;


export default App;
