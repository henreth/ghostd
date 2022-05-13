import React, { useState, useEffect } from 'react'
import { Route, Switch, useHistory } from "react-router-dom";
import axios from 'axios';
import './app.css';
import Header from '../Header/Header';
import HomePage from '../HomePage/HomePage';
import Matches from '../Matches/Matches';
import SelectedProfile from '../SelectedProfile/SelectedProfile';
import '../InfoModal/InfoModal';
import Auth from '../Auth/Auth';
import logo from '../../img/heart-ghost.png'

//Endpoints:

// 1 < Results
//gets

//unswiped profiles (base data)
let unswiped = '/unswiped_profiles'

//everyone (swiped/unswiped)
let peopleUrl = '/profiledeck'

//all matches
let matchesUrl = '/matches'

// Single results
//gets the user 
let userUrl = '/me'
//gets a specific profile
let profileUrl = '/profile/:id'

// posts 
// upon swiping either direction, creates a 'like' model for the user and targeted profile
let likeUrl = '/like'
let dislikeUrl = '/dislike'

//patches
// upon clicking the undo button, this resets the 'like' model for the user and targeted profile
let undoUrl = '/undo'

// patching to this will reset all information
let resetUrl = '/reset'
let unmatchUrl = '/unmatch'


export default function App() {
  let history = useHistory();

  let [profiles, setProfiles] = useState([]);
  let [matches, setMatches] = useState([]);
  let [likeCount, setLikeCount] = useState(0);

  const [currentIndex, setCurrentIndex] = useState(profiles.length - 1)
  const [lastPerson, setLastPerson] = useState({})

  let [showMatchModal, setShowMatchModal] = useState(false);
  let [showInfoModal, setShowInfoModal] = useState(false);


  //Sign Up
  const [signUpName, setSignUpName] = useState("");
  const [signUpLocation, setSignUpLocation] = useState("");
  const [signUpProNouns, setSignUpProNouns] = useState("");
  const [signUpPasswordConfirmation, setSignUpPasswordConfirmation] = useState("");

  // Log In:
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState('');
  const [signedIn, setSignedIn] = useState(false)


  function handleAllModals() {
    setShowMatchModal(false)
    setShowInfoModal(false)
  }
  useEffect(() => {
    fetch("/me")
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => {
            setUser(user)
            setSignedIn(true)
          })

          axios.get(unswiped)
            .then(r => {
              setProfiles(r.data)
              setCurrentIndex(r.data.length - 1)
              setLastPerson(r.data[r.data.length - 1])

              axios.get(matchesUrl)
                .then(r => {
                  setMatches(r.data)
                })

              axios.get('/unswiped_likes')
                .then(r => setLikeCount(r.data))

            })
        } else {
          history.push("/auth")
        }
      }
      )

  }, [])

  // Auth Functions

  function handleSignUpSubmit(e) {
    e.preventDefault();
    const signUpDetails = {
      "name": signUpName,
      "location": signUpLocation,
      "pronouns": signUpProNouns,
      "age": 1,
      username,
      password,
      "description": "Press edit to update your description!",
      "password_confirmation": signUpPasswordConfirmation,
    }
    axios.post("/signup", signUpDetails)
      .then(r => {
        setUsername('');
        setPassword('');
        setSignUpPasswordConfirmation('');
        setSignUpName('');
        setSignUpLocation('');
        setSignUpProNouns('');

        setUser(r.data)
        setSignedIn(true)
        history.push('/')
        axios.get(unswiped)
          .then(r => {
            setProfiles(r.data)
            setCurrentIndex(r.data.length - 1)
            setLastPerson(r.data[r.data.length - 1])


            axios.get(matchesUrl)
              .then(r => {
                setMatches(r.data)
              })

            axios.get('/unswiped_likes')
              .then(r => setLikeCount(r.data))

            history.push('/');
          })

      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data.errors);
          let msg = '';
          error.response.data.errors.map(error => { msg += error + '\n' })
          alert(msg)
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      });

  }

  function handleLogInSubmit(e) {
    e.preventDefault();
    const logInDetails = {
      username,
      password
    }

    axios.post("/login", logInDetails)
      .then((r) => {
        fetch("/me")
          .then((r) => {
            if (r.ok) {
              r.json().then((user) => {
                setUser(user)
                setSignedIn(true)
                axios.get(unswiped)
                  .then(r => {
                    setProfiles(r.data)
                    setCurrentIndex(r.data.length - 1)
                    setLastPerson(r.data[r.data.length - 1])

                    axios.get(matchesUrl)
                      .then(r => {
                        setMatches(r.data)
                      })

                    axios.get('/unswiped_likes')
                      .then(r => setLikeCount(r.data))

                    history.push('/');
                  })

              })
            }
            else {
              history.push("/");
            }
          })

      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data.errors);
          let msg = '';
          error.response.data.errors.map(error => { msg += error + '\n' })
          alert(msg)
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      });
  }

  function handleLogOut() {
    axios.delete('/logout')
      .then(r => {
        alert('You have now been logged out.')
        setSignedIn(false);
        history.push('/');
        setUser("");
        window.location.reload();
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data.errors);
          let msg = '';
          error.response.data.errors.map(error => { msg += error + '\n' })
          alert(msg)
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      });

  }


  return (
    <React.Fragment>
      {signedIn ? <Header
        matches={matches}
        setMatches={setMatches}
        showMatchModal={showMatchModal}
        setShowMatchModal={setShowMatchModal}
        showInfoModal={showInfoModal}
        setShowInfoModal={setShowInfoModal}
        user={user}
        handleAllModals={handleAllModals}
        handleLogOut={handleLogOut}
        signedIn={signedIn}
        setUser={setUser}
        likeCount={likeCount}
        setLikeCount={setLikeCount}
        setProfiles={setProfiles}
        setCurrentIndex={setCurrentIndex}
        setLastPerson={setLastPerson}
      /> : null}
      {signedIn ? null : <React.Fragment>
        <div className='welcome-header'>
          <div className="welcome-title">Ghostd</div>
          <img
            src={logo}
            alt="Logo"
            className="welcome-logo"
          />
        </div>
      </React.Fragment>}
      <div className='main-page'>
        <Switch>
          <Route exact path="/">
            <HomePage
              profiles={profiles}
              setProfiles={setProfiles}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              lastPerson={lastPerson}
              setLastPerson={setLastPerson}
              peopleUrl={peopleUrl}
              matches={matches}
              setMatches={setMatches}
              user={user}
              showMatchModal={showMatchModal}
              setShowMatchModal={setShowMatchModal}
              handleAllModals={handleAllModals}
              likeCount={likeCount}
              setLikeCount={setLikeCount}
            
            />
          </Route>
          <Route path="/matches">
            <Matches
              user={user}
              matches={matches}
              setMatches={setMatches}
            />
          </Route>
          <Route exact path='/match/:profileId'>
            <SelectedProfile
              user={user}
              matches={matches}
              setMatches={setMatches}
            />
          </Route>
          <Route path='/auth'>
            <Auth
              signedIn={signedIn}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              handleLogInSubmit={handleLogInSubmit}
              setSignedIn={setSignedIn}
              signUpPasswordConfirmation={signUpPasswordConfirmation}
              setSignUpPasswordConfirmation={setSignUpPasswordConfirmation}
              signUpName={signUpName}
              setSignUpName={setSignUpName}
              signUpLocation={signUpLocation}
              setSignUpLocation={setSignUpLocation}
              signUpProNouns={signUpProNouns}
              setSignUpProNouns={setSignUpProNouns}
              handleSignUpSubmit={handleSignUpSubmit}
            />
          </Route>

        </Switch>
      </div>

    </React.Fragment>
  )
}
