import { useState } from "react";
import { Card } from "antd";
import "./Share.css";
import { Button, IconButton, colors } from "@mui/material";
import { RiDeleteBin6Line } from "react-icons/ri";
const { Meta } = Card;

const inputData = {
  inputContent: "",
  textAreaContent: "",
};

const Share = () => {
  const [postContent, setPostContent] = useState(inputData);
  const [posts, setPosts] = useState([]);

  const handlePostSubmit = (event) => {
    event.preventDefault();

    const newPost = {
      id: posts.length + 1,
      content: postContent,
      timestamp: new Date().toISOString(),
      imageUrl: "https://picsum.photos/200",
    };

    setPosts([...posts, newPost]);
    setPostContent(inputData);

    console.log(postContent);
  };

  const handleChange = (event) => {
    setPostContent({
      ...postContent,
      [event.target.name]: event.target.value,
    });
  };

  const removePost = (id) => {
    const newPost = posts.filter((post) => post.id !== id);
    setPosts(newPost);
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
            value={postContent.textAreaContent}
          ></textarea>
          <input
            type="text"
            name="inputContent"
            className="shareInput"
            onChange={handleChange}
            placeholder="Text Url"
            value={postContent.inputContent}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={!postContent}
            className={!postContent ? "" : "shareButton"}
          >
            Post
          </Button>
        </div>
      </form>
      <div>
        {posts.map((post) => (
          <Card
            className="mt-5 cardContainer"
            key={post.id}
            hoverable
            cover={
              <div className="card-cover">
                <img src={post.imageUrl} alt="Preview" />
              </div>
            }
          >
            <div className="flex flex-col relative">
              <Meta
                description={post.content.inputContent}
                title="Url"
                style={colors.common}
              />
              <Meta
                description={post.content.textAreaContent}
                name="Describe"
                title="Describe"
              />
            </div>

            <IconButton
              onClick={() => removePost(post.id)}
              type="button"
              aria-label="delete"
              className="removeButton"
            >
              <RiDeleteBin6Line />
            </IconButton>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Share;
