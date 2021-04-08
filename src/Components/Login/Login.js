import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Login.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

const Login = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    console.log(location.state);
    const { from } = location.state || { from: { pathname: "/" } };

    const { register, handleSubmit, watch, errors } = useForm();
    const [flag, setFlag] = useState(true);
    const alreadyAcc = () => { setFlag(false); }
    const [signInError, setSignInError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    ///manual form
    const onSubmit = data => {
        const signedInUser = {
            name: data.name,
            email: data.email,
            password: data.password
        }
        if (flag) {
            firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
                .then((userCredential) => {
                    // Signed in 
                    var user = userCredential.user;
                    setLoggedInUser(signedInUser);
                    setSignInError(false);
                    console.log(user);
                    history.replace(from);

                    // ...
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ..
                    console.log(error);
                    setSignInError(true);
                    setErrorMsg(errorMessage);
                });
        } else {
            firebase.auth().signInWithEmailAndPassword(data.email, data.password)
                .then((userCredential) => {
                    // Signed in
                    var user = userCredential.user;
                    setLoggedInUser(signedInUser);
                    setSignInError(false);
                    console.log(user);
                    history.replace(from);
                    // ...
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(error);
                    setSignInError(true);
                    setErrorMsg(errorMessage);
                });
        }

    };


    ///google
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            const { displayName, email } = result.user;
            const signedInUser = { name: displayName, email: email, password: '' }
            setLoggedInUser(signedInUser);

            history.replace(from);

        }).catch(function (error) {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
    }

    return (
        <div className="bg" style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('https://i.ibb.co/XFfcB8G/Bg.png')` }}>
        <div className="loginForm container py-5" >
            <form onSubmit={handleSubmit(onSubmit)} className="form form-login">
                {flag && <input name="name" placeholder="Enter Your Name" ref={register({ required: true, maxLength: 20 })} />}
                <input name="email" placeholder="Enter Your Email" ref={register({ required: true, pattern: /\S+@\S+\.\S+/ })} />
                {errors.email && <span className="error">Valid Email required</span>}
                <input name="password" type="password" placeholder="Enter Your Password" ref={register({ required: true, min: 6, max: 99 })} />
                {errors.password && <span className="error">password should contain at least one character. ex: abc123</span>}
                {flag && <p>Already have an Account? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={alreadyAcc}>Log in</span></p>}

                <input type="submit" className="btn btn-primary" />

                <button className="btn btn-primary" onClick={handleGoogleSignIn}> Sign in With Google</button>
                {
                    signInError && <p className="error">{errorMsg}</p>
                }
            </form>
            </div>
        </div>
    );
};

export default Login;