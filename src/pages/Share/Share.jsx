import { useState } from "react";
import { Card } from "antd";
import "./Share.css";
const { Meta } = Card;
const Share = () => {
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState([]);

  const getImageForUrl = (url) => {
    return "https://picsum.photos/200";
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
          <textarea
            placeholder="Write someting"
            className="shareTextArea"
            rows={3}
            cols={50}
            wrap="physical"
          ></textarea>
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
