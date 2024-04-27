import "./Share.css";
import { useState } from "react";
import { Card } from "antd";
import { Button, CardHeader, CardMedia, IconButton } from "@mui/material";
import { Tooltip } from "reactstrap";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import TextArea from "antd/es/input/TextArea";
import DataTable from "../../components/UI/DataTable/DataTable";
import PropTypes from "prop-types";

import {
  postComment,
  postEditComment,
  postRemoveComment,
  removeAllPost,
  removeUserPostAndAllPost,
  setUserLike,
  setUserPost,
} from "../../redux-toolkit/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

const { Meta } = Card;

const inputData = {
  inputContent: "",
  textAreaContent: "",
};

const intialComment = {
  id: "",
  name: "",
};

const Share = ({ userInfo, userDataArray }) => {
  const [postContent, setPostContent] = useState(inputData);
  const [isShowComment, setIsShowComment] = useState(false);
  const [comment, setComment] = useState(intialComment);
  const dispatch = useDispatch();
  const { user, allPosts } = useSelector((state) => state.auth);
  const [tooltipOpen, setTooltipOpen] = useState({});

  const outletContext = useOutletContext();
  const searchTerm = outletContext ? outletContext.searchTerm : "";

  const handlePostSubmit = (event) => {
    event.preventDefault();

    const newPost = {
      id: Math.random().toString(36).substring(2),
      content: postContent,
      timestamp: new Date().toISOString(),
      imageUrl: "https://picsum.photos/200",
      userId: user.id,
      comments: [],
      likes: [],
    };

    dispatch(setUserPost(newPost));
    setPostContent(inputData);
  };

  const showComment = () => setIsShowComment(!isShowComment);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPostContent({ ...postContent, [name]: value });
  };

  const removePost = (removePost) => {
    if (userInfo.id === removePost.userId) {
      const userPosts = userInfo.posts.filter(
        (post) => post.userId !== userInfo.id
      );

      dispatch(
        removeUserPostAndAllPost({
          userPosts: userPosts,
          removePostId: removePost.id,
        })
      );
    } else if (userInfo.id !== removePost.userId) {
      const allnewPosts = allPosts.filter((post) => post.id !== removePost.id);
      dispatch(removeAllPost({ allnewPosts }));
    }
  };

  const commentChange = (event) =>
    setComment({ ...comment, name: event.target.value });

  const postNewComment = (post) => {
    if (!comment.id) {
      const newComment = {
        name: comment.name,
        id: new Date().toISOString(),
        postId: post.id,
        userId: user.id,
      };
      dispatch(postComment({ comment: newComment, post: post }));
    } else {
      dispatch(postEditComment({ post: post, comment: comment }));
    }

    setComment({ id: "", name: "" });
    setIsShowComment(false);
  };

  const removeComment = (comment, post) => {
    const updatedCommments = post.comments.filter((com) => {
      if (com.id !== comment.id) {
        return comment;
      }
    });

    dispatch(
      postRemoveComment({ postId: post.id, updatedCommments: updatedCommments })
    );
  };

  const postLike = (post) =>
    dispatch(setUserLike({ post: post, userId: user.id }));

  let sharePosts = userInfo?.id !== user?.id ? userInfo.posts : allPosts;

  if (searchTerm) {
    sharePosts = sharePosts.filter((post) =>
      post.content.inputContent.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const findUser = (userId) => {
    const userInfo = userDataArray.find((user) => user.id === userId);
    return userInfo.name + " " + userInfo.surname;
  };

  const likeCheck = (post) => {
    if (post.likes.length === 0) {
      return false;
    }

    let userInfo = post.likes.find((like) => like === user?.id);

    if (userInfo) {
      return true;
    }

    return false;
  };

  const likeToolTip = (likes) => {
    return userDataArray
      .filter((user) => likes.includes(user.id))
      .map((user) => <div key={user.id}>{user.name + " " + user.surname}</div>);
  };

  const toggleTooltip = (postId) => {
    setTooltipOpen((prev) => ({
      ...prev,
      [postId]: !prev[postId], // Mevcut durumun tersini ayarla
    }));
  };

  return (
    <div
      className={`${
        userInfo?.id === user?.id || sharePosts.length > 0
          ? "shareContainer"
          : ""
      }`}
    >
      {userInfo?.id === user?.id && (
        <form onSubmit={handlePostSubmit} noValidate>
          <div className="flex flex-col gap-2 mb-3 mt-20">
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
      )}
      <div>
        {sharePosts &&
          sharePosts.map((post) => (
            <Card className="mt-5 cardContainer" key={post.id}>
              {userInfo.id === user?.id && (
                <CardHeader
                  action={
                    <IconButton
                      onClick={() => removePost(post)}
                      aria-label="settings"
                    >
                      <RiDeleteBin6Line />
                    </IconButton>
                  }
                />
              )}

              <CardMedia component="img" image={post.imageUrl} alt="Preview" />

              <div className=" block">
                <div className="flex flex-col mt-4">
                  <Meta
                    className="metaUrl"
                    description={post.content && post.content.inputContent}
                    title="Url"
                  />
                  <Meta
                    className="metaDescribe"
                    description={post.content && post.content.textAreaContent}
                    title="Describe"
                  />

                  <Meta
                    className="metaDescribe"
                    description={findUser(post?.userId)}
                    title="Shared"
                  />
                </div>

                <div className="card-actions">
                  <div id={"postLike" + post.id} className="likeButtonDiv">
                    <Button
                      type="button"
                      className={`${
                        likeCheck(post) ? "likedButton" : "likeButton"
                      }`}
                      onClick={() => postLike(post)}
                      startIcon={<BiLike />}
                      id={post.id}
                    >
                      Like
                    </Button>

                    {post.likes.length > 0 && (
                      <div key={post.id}>
                        {/* Post için tooltip component */}
                        <Tooltip
                          isOpen={tooltipOpen[post.id] || false} // Varsayılan olarak false kullan
                          target={"postLike" + post.id}
                          toggle={() => toggleTooltip(post.id)}
                        >
                          {likeToolTip(post.likes)}
                        </Tooltip>
                      </div>
                    )}
                  </div>

                  <Button
                    type="button"
                    className="commentButton"
                    onClick={showComment}
                    startIcon={<FaRegComment />}
                  >
                    comment
                  </Button>
                </div>

                {post.comments && post.comments.length > 0 && (
                  <DataTable
                    rows={post.comments}
                    setRows={post.comments}
                    setComment={setComment}
                    showComment={showComment}
                    post={post}
                    removeComment={removeComment}
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
                      onClick={() => postNewComment(post)}
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
  userDataArray: PropTypes.array,
};

export default Share;
