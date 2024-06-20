import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import './Login.css';

const Login = ({ setName }) => {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserid = localStorage.getItem('userid');
    if (storedUserid) {
      setName(storedUserid);
      setLoggedIn(true);
    }
  }, [setName]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userid", userid);
    formData.append("password", password);

    try {
      const response = await axios.post(
        "http://study.aiclub.kr:8005/Login",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setMessage("로그인 성공하였습니다.");
        setName(userid);  
        setLoggedIn(true);
        localStorage.setItem('userid', userid);  
        navigate('/');
      } else {
        setMessage("로그인 실패하였습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("서버 오류가 발생하였습니다.");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setName("");
    localStorage.removeItem('userid');
  };

  return (
    <div className="login">
      <h2>로그인</h2>
      {!loggedIn && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>아이디</label>
            <input
              type="text"
              value={userid}
              onChange={(e) => setUserid(e.target.value)}
              placeholder="아이디를 입력하세요."
              required
            />
          </div>
          <div>
            <label>비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요."
              required
            />
          </div>
          <div className="button-container">
            <button type="submit">로그인</button>
            <Link to="/Signup">
              <button>회원가입</button>
            </Link>
          </div>
        </form>
      )}
      {loggedIn && (
        <div>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
