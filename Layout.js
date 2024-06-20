import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';
import mainlogo from './public/images/요기조기.png'
const Layout = ({ userid, handleLogout, children }) => {
  return (
    <div>
      <div className="navbar">
        <div className="nav-imgs">
          <Link to="/" className="auth-link">
           <img src={mainlogo}></img>
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/Map" className="auth-link">
            지도
          </Link>
          <Link to="/Travel" className="auth-link">
            여행지 추천
          </Link>
          <Link to="/Lodging" className="auth-link">
            숙박
          </Link>
          <Link to="/Postlist" className="auth-link">
            커뮤니티
          </Link>
        </div>
        <div className="user-section">
          {userid ? (
            <div>
              <span>{userid}님 </span>
              <button onClick={handleLogout}>로그아웃</button>
            </div>
          ) : (
            <button className="Loginbtn" onClick={() => {}}>
              <Link to="/Login" >
                <span className="button-text">LOGIN</span>
              </Link>
            </button>
          )}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
