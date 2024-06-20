import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './EditPostForm.css';
const EditPostForm = () => {
  const { post_id } = useParams();
  const [post, setPost] = useState({ title: "", contents: "", img: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); 

  useEffect(() => {
    const fetchPostDetail = async () => {
      if (!post_id) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://study.aiclub.kr:8005/PostDetail/${post_id}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post detail:", error);
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [post_id]);

  const handleInputChange = (e) => {
    if (e.target.name === "img") {
      setImageFile(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    } else {
      const { name, value } = e.target;
      setPost({ ...post, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("contents", post.contents);
    if (imageFile) {
      formData.append("img", imageFile);
    }

    try {
      await axios.put(`http://study.aiclub.kr:8005/PostDetail/${post_id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      window.location.href = `/Postlist`;
    } catch (error) {
      console.error("Error updating post:", error);
      if (error.response) {
        setError(error.response.data.detail); 
      } else {
        setError("An unexpected error occurred. Please try again."); 
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-post-form">
      <h2>게시글 수정</h2>
      <div className="current-image">
        <h3>현재 게시글의 사진</h3>
        {post.img && (
          <img src={`http://study.aiclub.kr:8005/imag/${post.img}`} alt="Current Post Image" style={{ maxWidth: "100%", height: "auto" }} />
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>제목 :</label>
          <input type="text" name="title" value={post.title} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>작성 내용 :</label>
          <textarea name="contents" value={post.contents} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>이미지 파일 선택 :</label>
          <input type="file" name="img" onChange={handleInputChange} accept="image/*" />
        </div>
        {previewImage && (
          <div className="preview-image">
            <img src={previewImage} alt="Preview Image" style={{ maxWidth: "100%", height: "auto" }} />
          </div>
        )}
        {error && <div className="error-message">{error}</div>} {}
        <button type="submit" className="btn btn-primary">수정</button>
      </form>
    </div>
  );
};

export default EditPostForm;
