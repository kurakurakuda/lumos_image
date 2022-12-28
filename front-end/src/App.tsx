import ImageList from 'components/ImageList';
import NotFound from 'components/NotFound';
import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import './css/App.css';

const App = () => (
  <div className="App">
    <BrowserRouter>
      <div className="link-area">
        <Link to="/" className="link">
          Home
        </Link>
        <Link to="/images" className="link">
          List
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/images" element={<ImageList />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
