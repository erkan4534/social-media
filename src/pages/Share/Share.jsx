import { useState } from "react";
import { Card } from "antd";
import "./Share.css";
import { Button, colors, debounce } from "@mui/material";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import TextArea from "antd/es/input/TextArea";
import { BiCaretRight } from "react-icons/bi";
const { Meta } = Card;

const inputData = {
  inputContent: "",
  textAreaContent: "",
};

const Share = () => {
  const [postContent, setPostContent] = useState(inputData);
  const [posts, setPosts] = useState([]);
  const [isShowComment, setIsShowComment] = useState(false);

  const handlePostSubmit = (event) => {
    event.preventDefault();

    const newPost = {
      id: posts.length + 1,
      content: postContent,
      timestamp: new Date().toISOString(),
      imageUrl: "https://picsum.photos/200",
    };

    setPosts([newPost, ...posts]);
    setPostContent(inputData);
  };

  const showComment = () => {
    setIsShowComment(!isShowComment);
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
            disabled={
              postContent.inputContent === "" &&
              postContent.textAreaContent === ""
            }
            className={
              postContent.inputContent === "" &&
              postContent.textAreaContent === ""
                ? ""
                : "shareButton"
            }
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
            <div className="relative">
              <div className=" block">
                <div className="flex flex-col">
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
              </div>

              <div className="card-actions">
                <Button className="commentAndLikeButton" startIcon={<BiLike />}>
                  Like
                </Button>

                <Button
                  type="button"
                  className="commentAndLikeButton"
                  onClick={showComment}
                  startIcon={<FaRegComment />}
                >
                  comment
                </Button>
              </div>
              {isShowComment && (
                <div className="commentArea">
                  <TextArea></TextArea>
                  <Button>Post</Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Share;
