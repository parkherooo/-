import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './Signup.css';

const Signup = () => {
  const [name, setName] = useState("");
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [passwordck, setPasswordck] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const emailDomains = ["gmail.com", "naver.com", "hanmail.net", "hotmail.com"];
  const [message, setMessage] = useState("");
  const [isUserIdChecked, setIsUserIdChecked] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isUserIdChecked) {
      window.alert("아이디 중복 확인을 해주세요.");
      return;
    }

    if (password !== passwordck) {
      window.alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("userid", userid);
    formData.append("password", password);
    formData.append("passwordck", passwordck);
    formData.append("email", `${email}@${selectedDomain}`);
    formData.append("phone", phone);

    try {
      const response = await axios.post(
        "http://study.aiclub.kr:8005/Signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        window.alert("회원가입이 완료되었습니다.");
        navigate('/Login');
      } else {
        window.alert("회원가입에 실패하였습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      window.alert("서버 오류가 발생하였습니다.");
    }
  };

  const handleUserIdCheck = async () => {
    if (!userid) {
      window.alert("아이디를 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post(
        "http://study.aiclub.kr:8005/check_userid",
        new URLSearchParams({ userid })
      );
      if (response.data.exists) {
        window.alert("이미 사용 중인 아이디입니다.");
        setIsUserIdChecked(false);
      } else {
        window.alert("사용 가능한 아이디입니다.");
        setIsUserIdChecked(true);
      }
    } catch (error) {
      console.error("Error:", error);
      window.alert("서버 오류가 발생하였습니다.");
      setIsUserIdChecked(false);
    }
  };

  return (
    <div className="signup">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>이름</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>아이디</label>
          <div className="input-group">
            <input
              type="text"
              value={userid}
              onChange={(e) => {
                setUserid(e.target.value);
                setIsUserIdChecked(false);
              }}
              required
            />
            <button type="button" onClick={handleUserIdCheck}>
              중복 확인
            </button>
          </div>
        </div>
        <div>
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>비밀번호 확인</label>
          <input
            type="password"
            value={passwordck}
            onChange={(e) => setPasswordck(e.target.value)}
            required
          />
        </div>
        <div>
          <label>이메일</label>
          <div className="input-group">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              required
            >
              <option value="">@이메일 선택</option>
              {emailDomains.map((domain) => (
                <option key={domain} value={domain}>
                  @{domain}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label>휴대폰번호</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <button type="submit">회원가입</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;
