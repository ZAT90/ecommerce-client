// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAOksYrS2jKOnnZKsDE_PeaWOs3pt9-6Ek",
    authDomain: "ecommerce-98c01.firebaseapp.com",
    projectId: "ecommerce-98c01",
    storageBucket: "ecommerce-98c01.appspot.com",
    messagingSenderId: "55508649727",
    appId: "1:55508649727:web:78296e95c36bbd9212aeca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const googleAuthProvider = new GoogleAuthProvider()