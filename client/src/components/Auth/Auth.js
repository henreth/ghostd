import React, { useState, useEffect } from 'react'
import './Auth.css';



export default function Auth({username, setUsername, password, setPassword, signedIn, handleLogInSubmit,signUpName, setSignUpName, signUpLocation, setSignUpLocation, signUpPasswordConfirmation, setSignUpPasswordConfirmation, signUpProNouns,setSignUpProNouns, handleSignUpSubmit }) {
    let [formType,setFormType]=useState(false)

    function changeType(){
        setUsername('');
        setPassword('');
        setSignUpPasswordConfirmation('');
        setSignUpName('');    
        setSignUpLocation('');    
        setSignUpProNouns('');    
        setFormType(!formType)
    }


    return (
        <div className="container">
            <div className="backbox">
                <div className="loginMsg">
                    <div className="textcontent">
                        <p className="title">Don't have an Account?</p>
                        <p>Millions of ghosts are swiping, but there's room for more...</p>
                        <button className="switch-button" onClick={changeType}>Sign Up</button>
                    </div>
                </div>
                <div className={formType?"signupMsg":"signupMsg visibility"}>
                    <div className="textcontent">
                        <p className="title">Have an Account?</p>
                        <p>Log in to meet your soulmate.</p>
                        <button className="switch-button" onClick={changeType}>LOG IN</button>
                    </div>
                </div>
            </div>
            /////
            <div className={formType?"frontbox moving":"frontbox"}>
                <form className={formType?"login hide": "login"}>
                    <h2 className='auth-title-type'>LOG IN</h2>
                    <div className="inputbox">
                        <input type="text" name="email" placeholder="  USERNAME" value={username} onChange={(e)=>{setUsername(e.target.value)}} />
                        <input type="password" name="password" placeholder="  PASSWORD"  value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    </div>
                    <p>FORGOT YOUR PASSWORD?</p>
                    <button className='auth-button' onClick={handleLogInSubmit}>LOG IN</button>
                </form>

                <div className={formType?"signup":"signup hide"}>
                    <h2 className='auth-title-type'>JOIN US</h2>
                    <div className="inputbox">
                        <input type="text" name="fullname" placeholder="  FULLNAME" />
                        <input type="text" name="email" placeholder="  USERNAME" />
                        <input type="text" name="pronouns" placeholder="  PRONOUNS" />
                        <input type="text" name="location" placeholder="  LOCATION" />
                        <input type="password" name="password" placeholder="  PASSWORD" />
                        <input type="password" name="password" placeholder="  PASSWORD CONFIRMATION" />
                    </div>
                    <button className='auth-button'>SIGN UP</button>
                </div>

            </div>
        </div>
    )
}