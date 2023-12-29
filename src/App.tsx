import React from 'react';
import './App.css';
import {Route, Routes, Navigate, Link} from "react-router-dom"

function App() {
  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/posts">Post List</Link>
        </li>
        <li>
          <Link to="/posts/:id">Post Detail</Link>
        </li>
        <li>
          <Link to="/posts/new">Post New</Link>
        </li>
        <li>
          <Link to="/posts/edit/:id">Post Edit</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<div>Home Page</div>}/>
        <Route path="/posts" element={<div>Post List Page</div>}/>
        <Route path="/posts/:id" element={<div>Post Detail Page</div>}/>
        <Route path="/posts/new" element={<div>Post New Page</div>}/>
        <Route path="/posts/edit/:id" element={<div>Post Edit Page</div>}/>
        <Route path="/profile" element={<div>Profile Page</div>}/>
        <Route path="*" element={<Navigate replace to="/"/>}/>
      </Routes>
    </>
  )
}

export default App;
