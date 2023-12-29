/*eslint-disable*/
import React from 'react';
import './App.css';
import {Route, Routes, Navigate, Link} from "react-router-dom"
import Router from "./components/Router";

function App() {
  return (
    <>
      {/*<li><Link to="/">Home</Link></li>*/}
      {/*<li><Link to="/posts">Post List</Link></li>*/}
      {/*<li><Link to="/posts/:id">Post Detail</Link></li>*/}
      {/*<li><Link to="/posts/new">Post New</Link></li>*/}
      {/*<li><Link to="/posts/edit/:id">Post Edit</Link></li>*/}
      <Router/>
    </>
  )
}

export default App;
