import React from 'react';
import { Container} from '@material-ui/core';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import Admin from './components/Admin/Admin';

const App = () => (
  <BrowserRouter>
    <Container maxWidth="lg">
      <Navbar />
      <Routes>
      <Route path="/"  element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/admin" element={<Admin/>}/>
      </Routes>
    </Container>
  </BrowserRouter>
);

export default App;
