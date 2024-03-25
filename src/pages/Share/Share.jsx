import { useState } from "react";
import "./Share.css";

const Share = () => {
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState([]);

  const getImageForUrl = (url) => {
    if (url.match(/hurriyet\.com\.tr/)) {
      return "assets/person/1.jpeg"; // URL'ye özel resim
    } else {
      return "default-placeholder.jpg"; // Tanınmayan URL için genel yer tutucu resim
    }
  };

  const handlePostSubmit = (event) => {
    event.preventDefault();
    const imageUrl = getImageForUrl(postContent);

    const newPost = {
      id: posts.length + 1,
      content: postContent,
      timestamp: new Date().toISOString(),
      imageUrl: imageUrl,
    };

    setPosts([...posts, newPost]);
    setPostContent("");
  };

  return (
    <div className="shareContainer">
      <form onSubmit={handlePostSubmit} noValidate>
        <div className="flex flex-col gap-2 mb-3">
          <input
            type="text"
            className="shareInput"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="URL girin"
            required
          />
          <button type="submit" className="shareButton">
            Post
          </button>
        </div>
      </form>
      <div>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <p>{post.content}</p>
              <img
                src={post.imageUrl}
                alt="Preview"
                style={{ maxWidth: "200px" }}
              />
              <small>{post.timestamp}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Share;
