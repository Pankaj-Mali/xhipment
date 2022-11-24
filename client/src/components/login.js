import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { GoogleLogin } from "react-google-login"
import { gapi } from "gapi-script"


import("../styles/login.css")
const Login = (props) => {

    let nav = useNavigate()

    useEffect(() => {
        gapi.load("client:auth2", () => {
            gapi.auth2.init({ clientId: "554973468213-tnvbdv59a0ut3h4itk7qs90b73dubjju.apps.googleusercontent.com" })
        })
    }, [])

    const responseSuccessGoogle = (response) => {

        axios({
            method: "POST",
            url: "http://localhost:8080/login",
            data: { tokenId: response.tokenId }
        }).then((res) => {
            let token = res.data.token
            let userName = res.data.userName
            localStorage.setItem('token', token)
            localStorage.setItem("google", true)
            localStorage.setItem("user", userName)

            nav("/home")
        });
    }

    const responseFailuareGoogle = (response) => {
        console.log(response);
        alert("LOGIN FAILED")

    }
    return (
        <div className='mainholder_loginpage'>
            <div className='formholder'>
                <h1>LOGIN</h1>
                <GoogleLogin

                    clientId="554973468213-tnvbdv59a0ut3h4itk7qs90b73dubjju.apps.googleusercontent.com"
                    buttonText='Login With Google'
                    onSuccess={responseSuccessGoogle}
                    onFailure={responseFailuareGoogle}

                    className="loging"
                />
            </div>
        </div>

    )
}

export default Login