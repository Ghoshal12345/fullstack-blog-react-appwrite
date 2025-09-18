import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


export default function Protected({children, authentication = true }){
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(state => state.auth.status);

    useEffect(() => {
    // authauthentication = true (protected route, e.g. Dashboard)
    // authentication = false (guest-only route, e.g. Login or Signup)



        if (authentication && authStatus !== authentication) { // user is at home page but not logged in -> to login page 
            navigate("/login");
        }
        else if (!authentication && authStatus !== authentication) {// user is at Login or Signup page but logged in -> to home page
            navigate("/");
        }
        setLoader(false);
    }, [authStatus, authentication, navigate])


    return loader? <h1>Loading...</h1> : children
}

