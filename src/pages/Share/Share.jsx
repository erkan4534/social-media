import { useState } from "react";
import { Card } from "antd";
import "./Share.css";
const { Meta } = Card;
const Share = () => {
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState([]);

  const getImageForUrl = (url) => {
    if (url.match(/hurriyet\.com\.tr/)) {
      return "assets/person/1.jpeg";
    } else {
      return "";
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
        {posts.map((post) => (
          <Card
            className="mt-5"
            key={post.id}
            hoverable
            cover={
              <div className="card-cover">
                <img src={post.imageUrl} alt="Preview" />
              </div>
            }
          >
            <Meta description={post.timestamp} title={post.content} />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Share;
