import "./Share.css";
import { useState } from "react";
import { Card } from "antd";
import { Button, CardHeader, CardMedia, IconButton } from "@mui/material";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import TextArea from "antd/es/input/TextArea";
import DataTable from "../../components/UI/DataTable/DataTable";
import {
  removeUserPost,
  setUserLike,
  setUserPost,
} from "../../redux/action/authActions";
import { useDispatch, useSelector } from "react-redux";

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
  const [isShowComment, setIsShowComment] = useState(false);
  const [comment, setComment] = useState(intialComment);
  const [commentArray, setCommentArray] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handlePostSubmit = (event) => {
    event.preventDefault();

    const newPost = {
      id: user.posts.length + 1,
      content: postContent,
      timestamp: new Date().toISOString(),
      imageUrl: "https://picsum.photos/200",
    };

    setPostContent(inputData);
    dispatch(setUserPost(newPost));
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
    const newPost = user.posts.filter((post) => post.id !== id);
    dispatch(removeUserPost(newPost));
    setCommentArray([]);
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

  const postLike = (post) => {
    const newPost = {
      ...post,
      likes: [user],
    };

    dispatch(setUserLike(newPost));
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
            placeholder="Text Url"
            type="text"
            name="inputContent"
            className="shareInput"
            onChange={handleChange}
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
        {user.posts.map((post) => (
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
                <Button
                  className="commentAndLikeButton"
                  onClick={() => postLike(post)}
                  startIcon={<BiLike />}
                >
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

              {commentArray && commentArray.length > 0 && (
                <DataTable
                  rows={commentArray}
                  setRows={setCommentArray}
                  setComment={setComment}
                />
              )}

              {isShowComment && (
                <div className="commentArea">
                  <TextArea
                    name="commentTextArea"
                    onChange={commentChange}
                    value={comment.name}
                  ></TextArea>
                  <Button
                    onClick={() => postCommnet()}
                    disabled={comment.name == ""}
                    variant="contained"
                  >
                    Post
                  </Button>
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
