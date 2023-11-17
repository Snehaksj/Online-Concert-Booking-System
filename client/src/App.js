import React from "react";
import Login from "./pages/Login/Login";
import Homepage from "./pages/Homepage";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
        {/* <Route path='/Homepage' element={<Homepage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
