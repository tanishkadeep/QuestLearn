'use client'
import { useState } from "react";
import AuthContext from "./authContext";
import { Toaster, toast } from "react-hot-toast";

const AuthState = (props) => {

    const [user, setUser] = useState(null);

    const signup = async (credentials) => {
        const signupPromise = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        toast.promise(
            signupPromise,
            {
                pending: 'Signing up...',
                success: 'Signup successful! 🎉',
                error: 'Signup failed. Please try again. 🤔'
            }
        );

        try {
            const res = await signupPromise;
            const data = await res.json();
            if (res.status === 200) {
                localStorage.setItem('token', data.token);
                return 'success';
            }
            return 'error';
        } catch (error) {
            console.log(error);
        }
    }

    const signin = async (credentials) => {
        const signinPromise = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        toast.promise(
            signinPromise,
            {
                pending: 'Signing in...',
                success: 'Signin successful! 🎉',
                error: 'Signin failed. Please try again. 🤔'
            }
        );

        try {
            const res = await signinPromise;
            const data = await res.json();
            if (res.status === 200) {
                localStorage.setItem('token', data.token);
                return 'success';
            }
            return 'error';
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Toaster />
            <AuthContext.Provider value={{ user, setUser, signup, signin }}>
                {props.children}
            </AuthContext.Provider>
        </>
    )
}

export default AuthState;