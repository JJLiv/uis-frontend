import React, {useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserContext from './auth/UserContext';
import LoadingSpinner from './common/LoadingSpinner';
import Navigation from './routes-nav/Navigation';
import Homepage from './homepage/Homepage';
import SignupForm from './auth/SignupForm';
import LoginForm from './auth/LoginForm';
import TeamList from "./teams/TeamList";
import TeamDetails from './teams/TeamDetails';
import PlayerList from "./players/PlayerList";
import PlayerDetails from "./players/PlayerDetails";
import UpInSportsApi from './api/api';
import useLocalStorage from './hooks/useLocalStorage';
import jwt_decode from "jwt-decode";

import 'bootstrap/dist/css/bootstrap.min.css';


export const TOKEN_STORAGE_ID = "up-in-sports-token";



function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  console.debug(
    "App",
    "infoLoaded=", infoLoaded,
    "currentUser=", currentUser,
    "token=", token,
  );

  useEffect(function loadCurrentUser() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt_decode(token);
          // put the token on the Api class so it can use it to call the API.
          UpInSportsApi.token = token;
          let currentUser = await UpInSportsApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }

    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    setInfoLoaded(false);
    getCurrentUser();
    
  }, [token]);


   /** Handles site-wide logout. */
   function logout() {
    setCurrentUser(null);
    setToken(null);
  }

    /** Handles site-wide signup.
   *
   * Automatically logs them in (set token) upon signup.
   *
   * Make sure you await this function and check its return value!
   */
    async function signup(signupData) {
      try {
        let token = await UpInSportsApi.signup(signupData);
        setToken(token);
        return { success: true };
      } catch (errors) {
        console.error("signup failed", errors);
        return { success: false, errors };
      }
    }


     /** Handles site-wide login.
   *
   * Make sure you await this function and check its return value!
   */
  async function login(loginData) {
    try {
      let token = await UpInSportsApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  if (!infoLoaded) return <LoadingSpinner />;
  return (

    <BrowserRouter>
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
    <div className="App">
      <h1>Hello</h1>
      <Navigation />
      <Routes>
          <Route exact path="/home" element={<Homepage />} />
          <Route exact path="/login" element={<LoginForm login={login} />} />
          <Route exact path="/signup" element={<SignupForm signup={signup} />} />
          <Route exact path="/teams" element={<TeamList />} />
          <Route exact path="/teams/:code" element={<TeamDetails />} />
          <Route exact path="/players" element={<PlayerList />} />
          <Route exact path="/players/:id" element={<PlayerDetails />} />
          
      </Routes>
    </div>
    </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
