import React ,{ useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './modules/Landing/Landing'
import SignIn from './modules/Landing/components/SignIn';
import SignUp from './modules/Landing/components/SignUp';
import Home from './modules/Home/Home';

const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </Router>
  )
};

export default App;