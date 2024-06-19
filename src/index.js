import React from 'react';
import './fontAwesomeConfig';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';
import Body from './components/body/Body.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './components/sign_up/SignUp.jsx';
import SignIn from './components/sign_in/SignIn.jsx';
import Favorites from './components/favoritespage/Favorites.jsx';
import MovieDetails from './components/moviedetails/MovieDetails.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}/>
        <Route path="sign_up" element={<SignUp />}/>
        <Route path="sign_in" element={<SignIn />}/>
        <Route path="favorites" element={<Favorites />}/>
        <Route path="movie_details/:movie_id" element={<MovieDetails />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
