import React, { useState, useEffect } from 'react'
import { Route, Switch, useHistory } from "react-router-dom";
import axios from 'axios';
import '../style/app.css';
import Header from './Header';
import HomePage from './HomePage';
import Matches from './Matches';
import SelectedProfile from './SelectedProfile';
import '../components/InfoModal';
import Auth from './Auth/Auth';

//Endpoints:

// 1 < Results
//gets

//unswiped profiles (base data)
let unswiped = '/unswiped_profiles'

//everyone (swiped/unswiped)
let peopleUrl = '/profiledeck'

// all likes
let likesUrl = '/likes'

//all matches
let matchesUrl = '/matches'

// Single results
//gets the user 
let userUrl = '/user'
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

  let [db, setDB] = useState([]);
  let [likes, setLikes] = useState([]);
  let [matches, setMatches] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(db.length - 1)
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
              setDB(r.data)
              // console.log(r.data)
              setCurrentIndex(r.data.length - 1)
              setLastPerson(r.data[r.data.length - 1])

              // axios.get(likesUrl)
              //   .then(r => {
              //     // console.log(r.data)
              //     setLikes(r.data)
              //   })

              // axios.get(matchesUrl)
              //   .then(r => {
              //     setMatches(r.data)
              //     // console.log(r.data)
              //   })

              // axios.get(userUrl)
              //   .then(r => {
              //     setUser(r.data)
              //     // console.log(r.data)
              //   })
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
          setDB(r.data)
          // console.log(r.data)
          setCurrentIndex(r.data.length - 1)
          setLastPerson(r.data[r.data.length - 1])

          // axios.get(likesUrl)
          //   .then(r => {
          //     // console.log(r.data)
          //     setLikes(r.data)
          //   })

          // axios.get(matchesUrl)
          //   .then(r => {
          //     setMatches(r.data)
          //     // console.log(r.data)
          //   })

          // axios.get(userUrl)
          //   .then(r => {
          //     setUser(r.data)
          //     // console.log(r.data)
          //   })
          history.push('/');
        })

      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data.errors);
          alert(error.response.data.errors)
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
                axios.get(unswiped)
                  .then(r => {
                    setDB(r.data)
                    // console.log(r.data)
                    setCurrentIndex(r.data.length - 1)
                    setLastPerson(r.data[r.data.length - 1])

                    // axios.get(likesUrl)
                    //   .then(r => {
                    //     // console.log(r.data)
                    //     setLikes(r.data)
                    //   })

                    // axios.get(matchesUrl)
                    //   .then(r => {
                    //     setMatches(r.data)
                    //     // console.log(r.data)
                    //   })

                    // axios.get(userUrl)
                    //   .then(r => {
                    //     setUser(r.data)
                    //     // console.log(r.data)
                    //   })
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
          alert(error.response.data.errors)
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
      /> : null}
      {/* ADD WELCOME TO GHOSTED TITLE THAT ONLY DISPLAYS WHEN NOT SIGNED IN */}
      <div className='main-page'>
        <Switch>
          <Route exact path="/">
            <HomePage
              db={db}
              setDB={setDB}
              likes={likes}
              setLikes={setLikes}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              lastPerson={lastPerson}
              setLastPerson={setLastPerson}
              peopleUrl={peopleUrl}
              likesUrl={likesUrl}
              matches={matches}
              setMatches={setMatches}
              user={user}
              showMatchModal={showMatchModal}
              setShowMatchModal={setShowMatchModal}
              handleAllModals={handleAllModals}
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
