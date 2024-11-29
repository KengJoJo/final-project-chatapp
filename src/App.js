import React, { useState } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [comment, setComment] = useState('');
  const [editingCommentIndex, setEditingCommentIndex] = useState(null);
  const [editingCommentContent, setEditingCommentContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');  // เพิ่มตัวแปรสำหรับคำค้นหา
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // สถานะล็อกอิน

  const addPost = () => {
    if (title.trim() === '' || content.trim() === '') return;
    setPosts([...posts, { title, content, comments: [], likes: 0 }]); // เพิ่ม property likes
    setTitle('');
    setContent('');
  };

  const deletePost = (index) => {
    const newPosts = posts.filter((_, i) => i !== index);
    setPosts(newPosts);
  };

  const startEditPost = (index) => {
    setEditIndex(index);
    setEditTitle(posts[index].title);
    setEditContent(posts[index].content);
  };

  const saveEditPost = () => {
    const newPosts = [...posts];
    newPosts[editIndex].title = editTitle;
    newPosts[editIndex].content = editContent;
    setPosts(newPosts);
    setEditIndex(null);
    setEditTitle('');
    setEditContent('');
  };

  const addComment = (postIndex) => {
    if (comment.trim() === '') return;
    const newPosts = [...posts];
    newPosts[postIndex].comments.push({ content: comment, likes: 0 });
    setPosts(newPosts);
    setComment('');
  };

  const startEditComment = (postIndex, commentIndex) => {
    setEditingCommentIndex({ postIndex, commentIndex });
    setEditingCommentContent(posts[postIndex].comments[commentIndex].content);
  };

  const saveEditComment = () => {
    const { postIndex, commentIndex } = editingCommentIndex;
    const newPosts = [...posts];
    newPosts[postIndex].comments[commentIndex].content = editingCommentContent;
    setPosts(newPosts);
    setEditingCommentIndex(null);
    setEditingCommentContent('');
  };

  const deleteComment = (postIndex, commentIndex) => {
    const newPosts = [...posts];
    newPosts[postIndex].comments.splice(commentIndex, 1);
    setPosts(newPosts);
  };

  // ฟังก์ชันเพิ่มหรือลดไลค์โพสต์
  const toggleLike = (index) => {
    const newPosts = [...posts];
    newPosts[index].likes = newPosts[index].likes + 1; // เพิ่มจำนวนไลค์
    setPosts(newPosts);
  };

  // ฟังก์ชันเพิ่มหรือลดไลค์คอมเมนต์
  const toggleLikeForComment = (postIndex, commentIndex) => {
    const newPosts = [...posts];
    newPosts[postIndex].comments[commentIndex].likes = newPosts[postIndex].comments[commentIndex].likes + 1;
    setPosts(newPosts);
  };

  // ฟังก์ชันค้นหาโพสต์ตามหัวข้อ
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ฟังก์ชันสำหรับการล็อกอิน
  const login = () => {
    if (username.endsWith('@gmail.com') && password === '1234') {
      setIsLoggedIn(true);
    } else {
      alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
  };

  // ฟังก์ชันสำหรับการออกจากระบบ
  const logout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  return (
    <div className="story-container">
      <div className="header">
        <h1>กาลครั้งหนึ่ง</h1>
        <h2>สร้างและแบ่งปันนิทานของคุณ</h2>
      </div>

      {/* ฟอร์มล็อกอิน */}
      {!isLoggedIn ? (
        <div className="login-form">
          <input
            type="text"
            placeholder="อีเมล"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="รหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={login}>ล็อกอิน</button>
        </div>
      ) : (
        <>
          {/* ฟอร์มค้นหา */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="ค้นหาหัวข้อโพสต์..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="add-post-form">
            <input
              type="text"
              placeholder="หัวข้อ"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="เนื้อหา"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button onClick={addPost}>เพิ่มโพสต์</button>
          </div>

          {editIndex !== null && (
            <div className="edit-post-form">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <button onClick={saveEditPost}>บันทึกการแก้ไข</button>
            </div>
          )}

          <ul className="posts-list">
            {filteredPosts.map((post, index) => (
              <li key={index} className="post-item">
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <div className="post-actions">
                  <button onClick={() => startEditPost(index)}>แก้ไข</button>
                  <button onClick={() => deletePost(index)}>ลบโพสต์</button>
                  <button onClick={() => toggleLike(index)}>
                    ไลค์ ({post.likes})
                  </button>
                </div>

                <div className="add-comment-form">
                  <input
                    type="text"
                    placeholder="เขียนคอมเมนต์..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button onClick={() => addComment(index)}>เพิ่มคอมเมนต์</button>
                </div>

                <ul className="comments-list">
                  {post.comments.map((comment, commentIndex) => (
                    <li key={commentIndex} className="comment-item">
                      {editingCommentIndex?.postIndex === index &&
                      editingCommentIndex?.commentIndex === commentIndex ? (
                        <>
                          <input
                            type="text"
                            value={editingCommentContent}
                            onChange={(e) => setEditingCommentContent(e.target.value)}
                          />
                          <button onClick={saveEditComment}>บันทึก</button>
                        </>
                      ) : (
                        <>
                          {comment.content}
                          <div className="comment-actions">
                            <button onClick={() => startEditComment(index, commentIndex)}>
                              แก้ไข
                            </button>
                            <button onClick={() => deleteComment(index, commentIndex)}>
                              ลบ
                            </button>
                            <button onClick={() => toggleLikeForComment(index, commentIndex)}>
                              ไลค์ ({comment.likes})
                            </button>
                          </div>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <button onClick={logout}>ออกจากระบบ</button>
        </>
      )}
    </div>
  );
}

export default App;
