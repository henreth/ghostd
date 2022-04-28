import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import './Auth.css';



export default function Auth({username, setUsername, password, setPassword, signedIn, handleLogInSubmit,signUpName, setSignUpName, signUpLocation, setSignUpLocation, signUpPasswordConfirmation, setSignUpPasswordConfirmation, signUpProNouns,setSignUpProNouns, handleSignUpSubmit }) {
    let [formType,setFormType]=useState(false)
    let history = useHistory();

    // useEffect(() => {
    //     if (signedIn == true) {
    //       history.push('/');
    //     }
    //   }, [])

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

                <form className={formType?"signup":"signup hide"}>
                    <h2 className='auth-title-type'>JOIN US</h2>
                    <div className="inputbox">
                        <input type="text" name="fullname" placeholder="  FULL NAME" value={signUpName} onChange={(e)=>{setSignUpName(e.target.value)}} />
                        <input type="text" name="email" placeholder="  USERNAME" value={username} onChange={(e)=>{setUsername(e.target.value)}} />
                        <input type="text" name="pronouns" placeholder="  PRONOUNS" value={signUpProNouns} onChange={(e)=>{setSignUpProNouns(e.target.value)}}  />
                        <input type="text" name="location" placeholder="  LOCATION" value={signUpLocation} onChange={(e)=>{setSignUpLocation(e.target.value)}} />
                        <input type="password" name="password" placeholder="  PASSWORD" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                        <input type="password" name="password" placeholder="  PASSWORD CONFIRMATION" value={signUpPasswordConfirmation} onChange={(e)=>{setSignUpPasswordConfirmation(e.target.value)}} />
                    </div>
                    <button className='auth-button' onClick={handleSignUpSubmit}>SIGN UP</button>
                </form>

            </div>
        </div>
    )
}