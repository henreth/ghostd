import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import './selectedprofile.css';
import LargeCard from "../LargeCard/LargeCard";

let profileUrl = '/profile/'

export default function SelectedProfile({user, matches,setMatches}) {
    let history = useHistory();
    const params = useParams();
    let [data,setData]=useState([]);
    let [nameLength, setNameLength] = useState(0)
    let [locationLength, setLocationLength] = useState(0)


    // console.log(params.profileId)
    document.title=`Ghostd - ${data.name}`


    useEffect(()=>{
        axios.get(profileUrl+params.profileId)
        .then(r=>{
            setData(r.data)
            setNameLength(r.data.name.length)
            setLocationLength(r.data.location.length)
        })
    },[])

    // if the selected profile is not in the user matches, display nothing
    // add error message?
    let matchIds = matches.map(match=>(match['id'] === data['id']))
    if (matchIds.includes(true)){
    } else {
        return null
    }
    
    return(
        <React.Fragment>
            <div className="profile-container">
                <LargeCard 
                    user={user}
                    profile={data}
                    nameLength={nameLength}
                    locationLength={locationLength}
                    matches={matches}
                    setMatches={setMatches}
                />
            </div>
        </React.Fragment>
    )

}