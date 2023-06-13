import React from 'react';
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import Home from './Home.js';
import ContactPage from './ContactPage.js';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/contact"  element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
};



export default App;
