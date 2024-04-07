import "./Share.css";
import { useState } from "react";
import { Card } from "antd";
import { Button, CardHeader, CardMedia, IconButton } from "@mui/material";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import TextArea from "antd/es/input/TextArea";
import DataTable from "../../components/UI/DataTable/DataTable";
import PropTypes from "prop-types";
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

const Share = ({ userInfo }) => {
  const [postContent, setPostContent] = useState(inputData);
  const [isShowComment, setIsShowComment] = useState(false);
  const [comment, setComment] = useState(intialComment);
  const [commentArray, setCommentArray] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handlePostSubmit = (event) => {
    event.preventDefault();

    const newPost = {
      id: userInfo.posts.length + 1,
      content: postContent,
      timestamp: new Date().toISOString(),
      imageUrl: "https://picsum.photos/200",
    };

    setPostContent(inputData);
    dispatch(setUserPost(newPost));
  };

  const showComment = () => setIsShowComment(!isShowComment);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPostContent({ ...postContent, [name]: value });
  };

  const removePost = (id) => {
    const newPost = userInfo.posts.filter((post) => post.id !== id);
    dispatch(removeUserPost(newPost));
    setCommentArray([]);
  };

  const commentChange = (event) =>
    setComment({ ...comment, name: event.target.value });

  const postComment = () => {
    const newComment = {
      name: comment.name,
      id: comment.id || Date.now(),
    };
    const existCommentArray = commentArray.map((row) =>
      row.id === comment.id ? newComment : row
    );
    setCommentArray(existCommentArray);
    setComment({ id: "", name: "" });
  };

  const postLike = (post) =>
    dispatch(setUserLike({ ...post, likes: [userInfo] }));

  if (userInfo && user && userInfo.id !== user.id) return null;

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
        {userInfo.posts.map((post) => (
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
                    onClick={postComment}
                    disabled={!comment.name}
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

Share.propTypes = {
  userInfo: PropTypes.object,
};

export default Share;
