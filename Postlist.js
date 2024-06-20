import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Postlist.css';

const Postlist = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [postsPerPage] = useState(5); 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://study.aiclub.kr:8005/Postlist");
        setPosts(response.data);
        setLoading(false);

      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };


    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="postlist">
      <h2>게시글 목록</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="게시글 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button onClick={() => { window.location.href = '/Postform'; }} className="create-button">
        게시글 작성
      </button>
      {currentPosts.length === 0 ? (
        <p>검색 결과가 없습니다.</p>
      ) : (
        <ul>
          {currentPosts.map((post) => (
            <li key={post.post_id} style={{ textDecoration: 'none', color: '#007bff' }}>
              <Link to={`/post/${post.post_id}`}>
                <div className="post-item">
                  <h3>{post.title}</h3>
                  <p>작성자: {post.userid}</p>
                  <p>작성일시: {post.create_at}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {}
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredPosts.length / postsPerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Postlist;
