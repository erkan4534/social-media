import "./Share.css";
import { useState } from "react";
import { Card } from "antd";
import { Button, CardHeader, CardMedia, IconButton } from "@mui/material";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import TextArea from "antd/es/input/TextArea";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DataTable from "../../components/UI/DataTable/DataTable";

const { Meta } = Card;

const inputData = {
  inputContent: "",
  textAreaContent: "",
};

const intialComment = {
  id: "",
  name: "",
};

const Share = () => {
  const [postContent, setPostContent] = useState(inputData);
  const [posts, setPosts] = useState([]);
  const [isShowComment, setIsShowComment] = useState(false);
  const [comment, setComment] = useState(intialComment);
  const [commentArray, setCommentArray] = useState([]);

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

  const commentChange = (event) => {
    setComment({ ...comment, name: event.target.value });
  };

  function postCommnet() {
    if (comment && comment.id != "" && comment.name != "") {
      const existCommentArray = commentArray.map((row) => {
        if (row.id === comment.id) {
          return { name: comment.name, id: comment.id };
        }
        return row;
      });

      setCommentArray(existCommentArray);
    } else {
      const newComment = {
        name: comment.name,
        id: Date.now(),
      };
      const newCommentArray = [...commentArray, newComment];
      setCommentArray(newCommentArray);
    }

    setComment(intialComment);
  }

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
          <Card className="mt-5 cardContainer" key={post.id}>
            <CardHeader
              action={
                <IconButton
                  onClick={() => removePost(post.id)}
                  aria-label="settings"
                >
                  <RiDeleteBin6Line />
                </IconButton>
              }
            />

            <CardMedia component="img" image={post.imageUrl} alt="Preview" />

            <div className=" block">
              <div className="flex flex-col mt-4">
                <Meta
                  className="metaUrl"
                  description={post.content.inputContent}
                  title="Url"
                />
                <Meta
                  className="metaDescribe"
                  description={post.content.textAreaContent}
                  title="Describe"
                />
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
                  <TextArea
                    name="commentTextArea"
                    onChange={commentChange}
                    value={comment.name}
                  ></TextArea>
                  <button onClick={() => postCommnet()} disabled={!comment}>
                    Post
                  </button>
                </div>
              )}

              {commentArray && commentArray.length > 0 && (
                <DataTable
                  rows={commentArray}
                  setRows={setCommentArray}
                  setComment={setComment}
                />
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Share;
