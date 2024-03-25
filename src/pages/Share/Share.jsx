import { useState } from "react";
import { Card } from "antd";
import "./Share.css";
import { Button } from "@mui/material";
const { Meta } = Card;

const inputData = {
  inputContent: "",
  textAreaContent: "",
};

const Share = () => {
  const [postContents, setPostContents] = useState(inputData);
  const [posts, setPosts] = useState([]);

  console.log(postContents);

  const handlePostSubmit = (event) => {
    event.preventDefault();

    const newPost = {
      id: posts.length + 1,
      content: postContents,
      timestamp: new Date().toISOString(),
      imageUrl: "https://picsum.photos/200",
    };

    setPosts([...posts, newPost]);
    setPostContents("");
  };

  const handleChange = (event) => {
    setPostContents({
      ...postContents,
    })[event.target.name] = event.target.value;
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
            onChange={handleChange}
            name="textAreaContent"
          ></textarea>
          <input
            type="text"
            name="inputContent"
            className="shareInput"
            onChange={handleChange}
            placeholder="Text Url"
            required
          />

          <Button
            type="submit"
            variant="contained"
            disabled={!postContents}
            className={!postContents ? "" : "shareButton"}
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
