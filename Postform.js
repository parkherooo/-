import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Postform.css';
import axios from "axios";

const Postform = ({ name }) => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [img, setImg] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userid", name); 
    formData.append("title", title);
    formData.append("contents", contents);
    if (img) {
      formData.append("img", img);
    }

    try {
      const response = await axios.post(
        "http://study.aiclub.kr:8005/Postform",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        setMessage("게시글 작성 완료.");
        setTitle("");
        setContents("");
        setImg(null);

        navigate('/Postlist');
      } else {
        setMessage("게시글 작성 실패.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("게시글 작성 실패.");
    }
  };

  return (
    <div className="postform">
      <h2>게시글 작성</h2>
      {name ? (
        <div>
          <p>작성자 : {name}</p>

        </div>
      ) : (
        <div>
          <p>로그인 후 게시글을 작성할 수 있습니다.</p>
        </div>
      )}
      {name && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요."
              required
            />
          </div>
          <div>
            <label>내용</label>
            <textarea
              value={contents}
              onChange={(e) => setContents(e.target.value)}
              placeholder="내용을 입력하세요."
              required
            ></textarea>
          </div>
          <div>
            <label>첨부파일</label>
            <input
              type="file"
              onChange={(e) => setImg(e.target.files[0])}
            />
          </div>
          <button type="submit">작성</button>
        </form>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Postform;
