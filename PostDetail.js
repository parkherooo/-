import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import EditPostForm from "./EditPostForm";
import { useNavigate } from "react-router-dom";
import "./PostDetail.css";

const PostDetail = () => {
  const { post_id } = useParams();
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(true);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [contents, setContents] = useState("");
  const [message, setMessage] = useState("");
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("userid");

  useEffect(() => {
    const fetchPostDetail = async () => {
      setLoading(false);
      if (!post_id) {
        setLoading(false);
        return;
      }
      try {
        const postResponse = await axios.get(`http://study.aiclub.kr:8005/PostDetail/${post_id}`);
        setPost(postResponse.data);
        
        if (postResponse.data.userid === localStorage.getItem("userid")) {
          setIsCurrentUser(true);
        } else {
          setIsCurrentUser(false);
        }
        const commentsResponse = await axios.get(`http://study.aiclub.kr:8005/Comments/${post_id}`);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error("Error fetching post detail:", error);
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [post_id]);

  const handleDelete = async () => {
    if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      try {
        await axios.delete(`http://study.aiclub.kr:8005/PostDetail/${post_id}`);
        navigate("/Postlist");
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userid", localStorage.getItem("userid"));
    formData.append("contents", contents);
    formData.append("post_id", post_id);

    try {
      const response = await axios.post(
        "http://study.aiclub.kr:8005/Comments",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setMessage("댓글 작성 완료.");
        setContents("");

        const newComment = {
          comment_id: response.data.comment_id,
          userid: localStorage.getItem("userid"),
          contents: contents,
          cm_date: new Date().toISOString(), 
        };
        setComments([newComment, ...comments]);
      } else {
        setMessage("댓글 작성 실패.");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      setMessage("댓글 작성 실패.");
    }
  };

  if (!post_id) {
    return <div>게시글 ID가 없습니다.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="post-detail">
      {isEditing && <EditPostForm postId={post_id} onCancel={toggleEditing} />}

      {!isEditing && (
        <div>
          <h2 className="post-title">제목: {post.title}</h2>
          <p>작성자: {post.userid}</p>
          <p>작성일시: {post.create_at}</p>
          <p>작성내용: {post.contents}</p>
          {post.img && (
            <img src={`http://study.aiclub.kr:8005/imag/${post.img}`} alt="게시글 이미지" className="post-image" />
          )}
          <div className="post-buttons">
            {isCurrentUser && (
              <>
                <button onClick={toggleEditing} className="btn btn-primary">
                  수정
                </button>
                <button onClick={handleDelete} className="btn btn-danger">
                  삭제
                </button>
              </>
            )}
          </div>

          <div className="comment-section">
            <h3>댓글 작성</h3>
            {isLoggedIn ? (
              <form onSubmit={handleSubmit}>
                <div>
                  <textarea
                    value={contents}
                    onChange={(e) => setContents(e.target.value)}
                    placeholder="내용을 입력하세요."
                    required
                    className="comment-textarea"
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">등록</button>
              </form>
            ) : (
              <p>댓글을 작성하려면 로그인이 필요합니다.</p>
            )}
            {message && <p className="message">{message}</p>}

            <div className="comment-list">
              <h3>댓글</h3>
              {comments.length === 0 ? (
                <p>댓글이 없습니다.</p>
              ) : (
                <ul>
                  {comments.map((comment) => (
                    <li key={comment.comment_id}>
                      <p>작성자: {comment.userid}</p>
                      <p>{comment.contents}</p>
                      <p>작성일시: {comment.cm_date}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
