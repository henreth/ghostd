import React, { useState, useEffect } from 'react'
import { Route, Switch } from "react-router-dom";
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
let peopleUrl = '/profiles'

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


function App () {

  let [db,setDB] = useState([]);
  let [likes,setLikes] = useState([]);
  let [matches,setMatches] = useState([]);
  let [user, setUser] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(db.length - 1)
  const [lastPerson, setLastPerson] = useState({})

  let [showMatchModal, setShowMatchModal] = useState(false);
  let [showInfoModal, setShowInfoModal] = useState(false);

  function handleAllModals(){
    setShowMatchModal(false)
    setShowInfoModal(false)
  }


  useEffect(()=>{
    axios.get(unswiped)
    .then(r=>{
      setDB(r.data)
      // console.log(r.data)
      setCurrentIndex(r.data.length-1)
      setLastPerson(r.data[r.data.length-1])

    axios.get(likesUrl)
    .then(r=>{
      // console.log(r.data)
      setLikes(r.data)})

    axios.get(matchesUrl)
    .then(r=>{
      setMatches(r.data)
      // console.log(r.data)
    })

    axios.get(userUrl)
    .then(r=>{
      setUser(r.data)
      // console.log(r.data)
    })
  })
  },[])

  return (
    <React.Fragment>
      <Header
        matches = {matches}
        setMatches = {setMatches}
        showMatchModal={showMatchModal}
        setShowMatchModal={setShowMatchModal}
        showInfoModal={showInfoModal}
        setShowInfoModal={setShowInfoModal}
        user={user}
        handleAllModals={handleAllModals}
        />
      <div className='main-page'>
      <Switch>
          <Route exact path="/">
            <HomePage 
              db = {db}
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
          <Route path ="/matches">
              <Matches 
                  user={user}
                  matches = {matches}
                  setMatches = {setMatches} 
              />
          </Route>
          <Route exact path ='/match/:profileId'>
              <SelectedProfile
                  matches={matches}
                  setMatches={setMatches}                
              />
          </Route>
          <Route path='/auth'>
              <Auth
              />
          </Route>

        </Switch>
      </div>

    </React.Fragment>
  )
}

export default App