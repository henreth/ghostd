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
                        <div className="title">Don't have an Account?</div>
                        <div className='auth-subtitle'>Millions of ghosts are already swiping, but there's always room for <span> more...</span></div>
                        <button className="switch-button" onClick={changeType}>Sign Up</button>
                    </div>
                </div>
                <div className={formType?"signupMsg":"signupMsg visibility"}>
                    <div className="textcontent">
                        <div className="title">Already Registered?</div>
                        <div className='auth-subtitle'>Log in to meet your <span>soulmate</span></div>
                        <button className="switch-button" onClick={changeType}>LOG IN</button>
                    </div>
                </div>
            </div>
            /////
            <div className={formType?"frontbox moving":"frontbox"}>
                <form className={formType?"login hide": "login"}>
                    <h2 className='auth-title-type'>LOG IN</h2>
                    <div className="inputbox">
                        <input className='auth-input' type="text" name="email" placeholder="Username" value={username} onChange={(e)=>{setUsername(e.target.value)}} />
                        <input className='auth-input' type="password" name="password" placeholder="Password"  value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    </div>
                    {/* <p>Forgot Your Password?</p> */}
                    <button className='auth-button' onClick={handleLogInSubmit}>SUBMIT</button>
                </form>

                <form className={formType?"signup":"signup hide"}>
                    <h2 className='auth-title-type'>JOIN US</h2>
                    <div className="inputbox">
                        <input className='auth-input' type="text" name="First Name" placeholder="First Name" value={signUpName} onChange={(e)=>{setSignUpName(e.target.value)}} />
                        <input className='auth-input' type="text" name="email" placeholder="Username" value={username} onChange={(e)=>{setUsername(e.target.value)}} />
                        <input className='auth-input' type="text" name="pronouns" placeholder="Pronouns" value={signUpProNouns} onChange={(e)=>{setSignUpProNouns(e.target.value)}}  />
                        <input className='auth-input' type="text" name="location" placeholder="Location" value={signUpLocation} onChange={(e)=>{setSignUpLocation(e.target.value)}} />
                        <input className='auth-input' type="password" name="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                        <input className='auth-input' type="password" name="password" placeholder="Password Confirmation" value={signUpPasswordConfirmation} onChange={(e)=>{setSignUpPasswordConfirmation(e.target.value)}} />
                    </div>
                    <button className='auth-button' onClick={handleSignUpSubmit}>SIGN UP</button>
                </form>

            </div>
        </div>
    )
}