import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Signup from './Signup';
import Postform from './Postform';
import Postlist from './Postlist';
import PostDetail from './PostDetail';
import Layout from './Layout'; 
import Home from './Home';
import Kakaomap from './Kakaomap';
import Lodging from './Lodging';
import Travel from './Travel';
import PlaceDetail from './PlaceDetail'; 

const App = () => {
  const [userid, setUserid] = useState(localStorage.getItem('userid') || '');

  useEffect(() => {
    const storedUserid = localStorage.getItem('userid');
    if (storedUserid) {
      setUserid(storedUserid);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userid');
    setUserid('');
  };

  const handleLoginClick = () => {
    navigate("/Login");
  };

  return (
    <Router>
      <Layout userid={userid} handleLogout={handleLogout} handleLoginClick={handleLoginClick}>
        <Routes>
          <Route path="/Login" element={<Login setName={setUserid} />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/Postform" element={<Postform name={userid} setName={setUserid} />} />
          <Route path="/Postlist" element={<Postlist />} />
          <Route path="/post/:post_id" element={<PostDetail />} />
          <Route path="/Lodging" element={<Lodging />} />
          <Route path="/Map" element={<Kakaomap />} />
          <Route path="/Travel" element={<Travel />} />
          <Route path="/place/:placeId" element={<PlaceDetail />} /> {/* Add this line */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
