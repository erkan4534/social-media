import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
  documentId,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

const initialState = {
  user: null,
  allPosts: [],
  userProfile: null,
  isUserCheck: false,
  friendsData: [],
  userDataArray: null,
};

interface AddNewFriendPayload {
  id: string;
  posts: any;
}

export const addNewFriend: any = createAsyncThunk(
  "userSlice/addNewFriend",
  async ({ id: friendId, posts }: AddNewFriendPayload, { getState, rejectWithValue }) => {
    const state: any = getState();
    const userId = state.userSlice.user.id;

    if (!userId) {
      return rejectWithValue("User not found in state");
    }
    try {
      const userDocRef = doc(db, "personnels", userId);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        throw new Error("User document does not exist!");
      }

      const userData = userDoc.data();
      const updatedFriends = [...userData.friends, friendId];

      await updateDoc(userDocRef, {
        friends: updatedFriends,
      });

      return { friends: updatedFriends, posts };
    } catch (error: any) {
      console.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

interface RemoveFriendPayload {
  friendId: string;
}

export const removeFriend: any = createAsyncThunk(
  "userSlice/removeFriend",
  async ({ friendId }: RemoveFriendPayload, { getState, rejectWithValue }) => {
    const state: any = getState();
    const userId = state.userSlice.user?.id;

    if (!userId) {
      return rejectWithValue("User not found in state");
    }
    try {
      const userDocRef = doc(db, "personnels", userId);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        throw new Error("User document does not exist!");
      }

      const userData = userDoc.data();
      const updatedFriends = userData.friends.filter(
        (frdId: any) => frdId !== friendId
      );

      await updateDoc(userDocRef, {
        friends: updatedFriends,
      });

      return { userId, friends: updatedFriends };
    } catch (error: any) {
      console.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

interface FindUserPayload {
  userId: string;
}


export const findUser: any = createAsyncThunk(
  "userSlice/findUser",
  async ({ userId }: FindUserPayload, { rejectWithValue }) => {
    try {
      const userDocRef = doc(db, "personnels", userId);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        throw new Error("User document does not exist!");
      }

      const userProfile = {
        ...userDoc.data(),
        id: userDocRef.id,
      };

      return {
        userProfile,
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


export const findInUsers: any = createAsyncThunk(
  "userSlice/findInUsers",
  async (userIds, { rejectWithValue }) => {
    const friendsData: any = [];
    try {
      const userDetailDataQuery = query(
        collection(db, "personnels"),
        where(documentId(), "in", userIds)
      );

      const querUserFriends = await getDocs(userDetailDataQuery);

      querUserFriends.forEach((doc) => {
        friendsData.push(doc.data());
      });

      return friendsData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const setUserPost: any = createAsyncThunk(
  "userSlice/setUserPost",
  async (post, { getState, rejectWithValue }) => {
    const state: any = getState();
    const userId = state.userSlice.user?.id;
    if (!userId) {
      return rejectWithValue("User not found in state");
    }
    try {
      const userDocRef = doc(db, "personnels", userId);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        throw new Error("User document does not exist!");
      }

      const userData = userDoc.data();
      const updatedPosts = [post, ...userData.posts];

      await updateDoc(userDocRef, {
        posts: updatedPosts,
      });

      return { post };
    } catch (error: any) {
      console.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

interface RemovePostPayload {
  userId: string;
  id: string;
}

export const removePost: any = createAsyncThunk(
  "userSlice/removePost",
  async ({ userId, id }: RemovePostPayload, { getState, rejectWithValue }) => {
    const state: any = getState();
    const sessionUserId = state.userSlice.user?.id;

    if (!sessionUserId) {
      return rejectWithValue("User not found in state");
    }
    try {
      if (sessionUserId === userId) {
        const userDocRef = doc(db, "personnels", sessionUserId);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          throw new Error("User document does not exist!");
        }

        const userData = userDoc.data();
        const updatedPosts = userData.posts.filter((post: any) => post.id !== id);

        await updateDoc(userDocRef, {
          posts: updatedPosts,
        });

        return { postId: id, posts: updatedPosts };
      }

      return { postId: id, posts: null };
    } catch (error: any) {
      console.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

interface SetUserLikePayload {
  post: any;
}

export const setUserLike: any = createAsyncThunk(
  "userSlice/setUserLike",
  async ({ post }: SetUserLikePayload, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      const sessionUserId = state.userSlice.user?.id;

      const userDocRef = doc(db, "personnels", post.userId);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        throw new Error("User document does not exist!");
      }

      const userData = userDoc.data();
      const postIndex = userData.posts.findIndex((pst: any) => pst.id === post.id);

      if (postIndex === -1) {
        throw new Error("Post not found!");
      }

      const selectPost = userData.posts[postIndex];

      const likes = selectPost.likes || [];
      const user = likes.find((id: any) => id === sessionUserId);

      if (user) {
        selectPost.likes = likes.filter((id: any) => id !== sessionUserId);
      } else {
        const updatedLikes = [sessionUserId, ...likes];
        selectPost.likes = updatedLikes;
      }

      userData.posts[postIndex] = selectPost;

      await updateDoc(userDocRef, {
        posts: userData.posts,
      });

      return { selectPost };
    } catch (error: any) {
      console.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

interface PostCommentPayload {
  comment: any;
  post: any;
}

export const postComment: any = createAsyncThunk(
  "userSlice/postComment",
  async ({ comment, post }: PostCommentPayload, { rejectWithValue }) => {
    try {
      const userDocRef = doc(db, "personnels", post.userId);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        throw new Error("User document does not exist!");
      }

      const userData = userDoc.data();
      const updatedComments = [comment, ...(post.comments || [])];

      const updatedPosts = userData.posts.map((pst: any) => {
        if (pst.id === post.id) {
          pst.comments = updatedComments;
          return pst;
        }
        return pst;
      });

      await updateDoc(userDocRef, {
        posts: updatedPosts,
      });

      return { comment };
    } catch (error: any) {
      console.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

interface PostRemoveCommentPayload {
  comment: any;
  post: any;
}

export const postRemoveComment: any = createAsyncThunk(
  "userSlice/postRemoveComment",
  async ({ comment, post }: PostRemoveCommentPayload, { rejectWithValue }) => {
    try {
      const userDocRef = doc(db, "personnels", post.userId);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        throw new Error("User document does not exist!");
      }

      const userData = userDoc.data();
      const updatedComments = post.comments.filter(
        (cmt: any) => cmt.id !== comment.id
      );

      const updatedPosts = userData.posts.map((pst: any) => {
        if (pst.id === post.id) {
          pst.comments = updatedComments;
          return pst;
        }
        return pst;
      });

      await updateDoc(userDocRef, {
        posts: updatedPosts,
      });

      return { comment };
    } catch (error: any) {
      console.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

interface PostEditCommentPayload {
  comment: any;
  post: any;
}

export const postEditComment: any = createAsyncThunk(
  "userSlice/postEditComment",
  async ({ comment, post }: PostEditCommentPayload, { rejectWithValue }) => {
    try {
      const userDocRef = doc(db, "personnels", post.userId);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        throw new Error("User document does not exist!");
      }

      const userData = userDoc.data();
      const updatedComments = post.comments.map((cmt: any) => {
        if (cmt.id === comment.id) {
          return comment;
        }
        return cmt;
      });

      const updatedPosts = userData.posts.map((pst: any) => {
        if (pst.id === post.id) {
          pst.comments = updatedComments;
          return pst;
        }
        return pst;
      });

      await updateDoc(userDocRef, {
        posts: updatedPosts,
      });

      return { comment, post };
    } catch (error: any) {
      console.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

interface ChangeStatusPayload {
  memberId: string;
  memberStatus: number;
}


export const changeStatus: any = createAsyncThunk(
  "userSlice/changeStatus",
  async ({ memberId, memberStatus }: ChangeStatusPayload, { rejectWithValue }) => {
    try {
      const userDocRef = doc(db, "personnels", memberId);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        throw new Error("User document does not exist!");
      }

      await updateDoc(userDocRef, {
        status: memberStatus,
      });

      return { memberId, memberStatus };
    } catch (error: any) {
      console.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);


export const checkUserEmail: any = createAsyncThunk(
  "userSlice/checkUserEmail",
  async (email, { rejectWithValue }) => {
    try {
      const userDetailDataQuery = query(
        collection(db, "personnels"),
        where("email", "==", email)
      );

      const querySnapshot = await getDocs(userDetailDataQuery);
      const isEmailCheck = querySnapshot.size > 0;

      return { isEmailCheck };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      const { user, userDataArray, allPosts } = action.payload;
      state.user = user;
      state.userDataArray = userDataArray;
      state.allPosts = allPosts;
    },
    userLogout: (state) => {
      state.user = null;
      state.userDataArray = null;
      state.allPosts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewFriend.fulfilled, (state: any, action: any) => {
        const { friends, posts } = action.payload;
        state.user.friends = friends;
        if (state.userProfile) {
          state.userProfile.friends = friends;
        }
        state.allPosts = [...posts, ...state.allPosts];
      })
      .addCase(addNewFriend.rejected, (state: any, action: any) => {
        state.error = action.payload;
      })
      .addCase(removeFriend.fulfilled, (state: any, action: any) => {
        const { userId, friends } = action.payload;
        if (state.user && state.user.id === userId) {
          state.user.friends = friends;
          if (state.userProfile) {
            state.userProfile.friends = friends;
          }
        }
      })
      .addCase(removeFriend.rejected, (state: any, action: any) => {
        state.error = action.payload;
      })
      .addCase(findUser.fulfilled, (state: any, action: any) => {
        const { userProfile } = action.payload;
        state.userProfile = userProfile;
      })
      .addCase(findUser.rejected, (state: any, action: any) => {
        state.error = action.payload;
      })
      .addCase(findInUsers.fulfilled, (state: any, action: any) => {
        state.friendsData = action.payload;
      })
      .addCase(findInUsers.rejected, (state: any, action: any) => {
        state.error = action.payload;
      })
      .addCase(setUserPost.fulfilled, (state: any, action: any) => {
        const { post } = action.payload;
        state.allPosts = [post, ...state.allPosts];

        if (state.user.id === post.userId) {
          state.user.posts = [post, ...state.user.posts];
        }
      })
      .addCase(setUserPost.rejected, (state: any, action: any) => {
        state.error = action.payload;
      })
      .addCase(removePost.fulfilled, (state: any, action: any) => {
        const { postId, posts } = action.payload;
        state.allPosts = state.allPosts.filter((post: any) => post.id !== postId);
        if (posts != null) {
          state.user.posts = posts;
        }
      })
      .addCase(removePost.rejected, (state: any, action: any) => {
        state.error = action.payload;
      })
      .addCase(setUserLike.fulfilled, (state: any, action: any) => {
        const { selectPost } = action.payload;

        const postIndex = state.allPosts.findIndex(
          (post: any) => post.id === selectPost.id
        );

        if (postIndex !== -1) {
          state.allPosts[postIndex].likes = selectPost.likes;
        }

        if (state.user.id === selectPost.userId) {
          const userPostIndex = state.user.posts.findIndex(
            (post: any) => post.id === selectPost.id
          );
          if (userPostIndex !== -1) {
            state.user.posts[userPostIndex].likes = selectPost.likes;
          }
        }

        if (state.userProfile != null) {
          const profilePostIndex = state.userProfile.posts.findIndex(
            (post: any) => (post.id = selectPost.id)
          );

          if (profilePostIndex !== -1) {
            state.userProfile.posts[profilePostIndex].likes = selectPost.likes;
          }
        }
      })
      .addCase(setUserLike.rejected, (state: any, action: any) => {
        state.error = action.payload;
      })
      .addCase(postComment.fulfilled, (state: any, action: any) => {
        const { comment } = action.payload;

        const postIndex = state.allPosts.findIndex(
          (pst: any) => pst.id === comment.postId
        );
        state.allPosts[postIndex].comments = [
          comment,
          ...(state.allPosts[postIndex].comments || []),
        ];

        if (state.user.id === comment.userId) {
          const postIndex = state.user.posts.findIndex(
            (pst: any) => pst.id === comment.postId
          );

          state.user.posts[postIndex].comments = [
            comment,
            ...(state.allPosts[postIndex].comments || []),
          ];
        }
      })
      .addCase(postComment.rejected, (state: any, action: any) => {
        state.error = action.payload;
      })
      .addCase(postRemoveComment.fulfilled, (state: any, action: any) => {
        const { comment } = action.payload;

        const postIndex = state.allPosts.findIndex(
          (pst: any) => pst.id === comment.postId
        );
        state.allPosts[postIndex].comments = state.allPosts[
          postIndex
        ].comments.filter((cmt: any) => cmt.id !== comment.id);

        if (state.user.id === comment.userId) {
          const postIndex = state.user.posts.findIndex(
            (pst: any) => pst.id === comment.postId
          );

          state.user.posts[postIndex].comments = state.allPosts[
            postIndex
          ].comments.filter((cmt: any) => cmt.id !== comment.id);
        }
      })
      .addCase(postRemoveComment.rejected, (state: any, action: any) => {
        state.error = action.payload;
      })
      .addCase(postEditComment.fulfilled, (state: any, action: any) => {
        const { comment, post } = action.payload;
        state.allPosts = updateComments(state.allPosts, post.id, comment);
        if (state.user.id === comment.userId) {
          state.user.posts = updateComments(state.user.posts, post.id, comment);
        }
      })
      .addCase(postEditComment.rejected, (state: any, action: any) => {
        state.error = action.payload;
      })
      .addCase(changeStatus.fulfilled, (state: any, action: any) => {
        const { memberId, memberStatus } = action.payload;

        state.userDataArray = state.userDataArray.map((usr: any) => {
          if (usr.id === memberId) {
            usr.status = memberStatus;
            return usr;
          }
          return usr;
        });
      })
      .addCase(changeStatus.rejected, (state: any, action: any) => {
        state.error = action.payload;
      })
      .addCase(checkUserEmail.fulfilled, (state, action: any) => {
        state.isUserCheck = action.payload;
      })
      .addCase(checkUserEmail.rejected, (state: any, action: any) => {
        state.error = action.payload;
      });
  },
});

const updateComments = (posts: any, postId: any, updatedComment: any) => {
  return posts.map((pst: any) => {
    if (pst.id === postId) {
      pst.comments = pst.comments.map((cmt: any) =>
        cmt.id === updatedComment.id ? updatedComment : cmt
      );
    }
    return pst;
  });
};

export const { userLogin, userLogout } = userSlice.actions;

export default userSlice.reducer;
