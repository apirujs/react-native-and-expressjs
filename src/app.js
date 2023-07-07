import React from 'react';
import {BrowserRouter,Routes,Route,Navigate,Link} from 'react-router-dom';
import QRPage from './QR.js';
import ContactPage from './ContactPage.js';
import DijkstraPage from './Dijkstra.js';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<DijkstraPage/>} />
        <Route path="/QrCode"  element={<QRPage />} />
        <Route path="/contact"  element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
};



export default App;
