import React  , {useEffect}from 'react'
import { GoogleLogout } from "react-google-login"
import {  useNavigate } from "react-router-dom"
import { gapi } from "gapi-script"


const Header=()=> {
  let nav = useNavigate()

  const google = localStorage.getItem("google")
  const user = localStorage.getItem("user")
  const handlelogout = ()=>{
    localStorage.clear()
    nav("/")
  }
  useEffect(() => {
    gapi.load("client:auth2", () => {
        gapi.auth2.init({ clientId: "554973468213-tnvbdv59a0ut3h4itk7qs90b73dubjju.apps.googleusercontent.com" })
    })
}, [])

  return (
    <div className='mainholder-header'>
        <div className='header'>
            <span className='user'>{user}</span>
            {
                  (google)? 
                  <GoogleLogout
                  clientId="554973468213-tnvbdv59a0ut3h4itk7qs90b73dubjju.apps.googleusercontent.com"
                  buttonText='LOGOUT'
                  onLogoutSuccess={handlelogout}
                
                  className="logout loggoogle"
                  />
                :null  
            }
        </div>
    </div>
  )
}

export default Header




