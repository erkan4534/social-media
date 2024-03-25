import { useState } from "react";
import { Card } from "antd";
import "./Share.css";
import { Button } from "@mui/material";
const { Meta } = Card;
const Share = () => {
  const [postInput, setPostInput] = useState("");
  const [postTextArea, setPostTextArea] = useState("");
  const [posts, setPosts] = useState([]);

  const handlePostSubmit = (event) => {
    event.preventDefault();

    const newPost = {
      id: posts.length + 1,
      postInputContent: postInput,
      postTextAreaContent: postTextArea,
      timestamp: new Date().toISOString(),
      imageUrl: "https://picsum.photos/200",
    };

    setPosts([...posts, newPost]);
    setPostInput("");
  };

  const handleChange = (event) => {};

  return (
    <div className="shareContainer">
      <form onSubmit={handlePostSubmit} noValidate>
        <div className="flex flex-col gap-2 mb-3">
          <textarea
            placeholder="Write someting"
            className="shareTextArea"
            rows={3}
            cols={50}
            onChange={(e) => setPostTextArea(e.target.value)}
          ></textarea>
          <input
            type="text"
            className="shareInput"
            value={postInput}
            onChange={(e) => setPostInput(e.target.value)}
            placeholder="URL girin"
            required
          />

          <Button
            type="submit"
            variant="contained"
            disabled={!postInput}
            className={!postInput ? "" : "shareButton"}
          >
            Post
          </Button>
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
            <Meta description={post.timestamp} title={post.postInputContent} />
            <Meta
              description={post.timestamp}
              title={post.postTextAreaContent}
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Share;
