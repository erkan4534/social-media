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
  isLoggedIn: false,
  isLoginInValidMessage: false,
  userDataArray: null,
  userProfile: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    let allPosts = [];
    const userDataArray = [];

    try {
      const userDetailDataQuery = query(
        collection(db, "personnels"),
        where("email", "==", email),
        where("password", "==", password)
      );
      const querySnapshot = await getDocs(userDetailDataQuery);
      const userDetailData = [];
      querySnapshot.forEach((doc) => {
        userDetailData.push({ id: doc.id, ...doc.data() });
      });

      if (userDetailData.length === 0) {
        throw new Error("No user found with the given credentials.");
      }

      if (userDetailData[0].role === "memberUser") {
        const friendsData = [];

        if (userDetailData[0].friends.length > 0) {
          const userDetailDataQuery = query(
            collection(db, "personnels"),
            where(documentId(), "in", userDetailData[0].friends)
          );

          const querUserFriends = await getDocs(userDetailDataQuery);

          querUserFriends.forEach((doc) => {
            friendsData.push(doc.data());
          });
        }

        const friendsPost = friendsData.map((friend) => friend.posts).flat();
        allPosts = [...userDetailData[0].posts, ...friendsPost];

        const allMembersQuery = query(collection(db, "personnels"));

        const allMembersDocs = await getDocs(allMembersQuery);
        allMembersDocs.forEach((doc) => {
          userDataArray.push({ id: doc.id, ...doc.data() });
        });
      }

      return {
        user: userDetailData[0],
        allPosts: allPosts,
        userDataArray: userDataArray,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewFriend = createAsyncThunk(
  "auth/addNewFriend",
  async ({ id: friendId, posts }, { getState, rejectWithValue }) => {
    const state = getState();
    const userId = state.auth.user?.id;

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
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const removeFriend = createAsyncThunk(
  "auth/removeFriend",
  async ({ friendId }, { getState, rejectWithValue }) => {
    const state = getState();
    const userId = state.auth.user?.id;

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
        (frdId) => frdId !== friendId
      );

      await updateDoc(userDocRef, {
        friends: updatedFriends,
      });

      return { userId, friends: updatedFriends };
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const findUser = createAsyncThunk(
  "auth/findUser",
  async ({ userId }, { rejectWithValue }) => {
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
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const setUserPost = createAsyncThunk(
  "auth/setUserPost",
  async (post, { getState, rejectWithValue }) => {
    const state = getState();
    const userId = state.auth.user?.id;
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
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const removePost = createAsyncThunk(
  "auth/removePost",
  async ({ userId, id }, { getState, rejectWithValue }) => {
    const state = getState();
    const sessionUserId = state.auth.user?.id;

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
        const updatedPosts = userData.posts.filter((post) => post.id !== id);

        await updateDoc(userDocRef, {
          posts: updatedPosts,
        });

        return { postId: id, posts: updatedPosts };
      }

      return { postId: id, posts: null };
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const setUserLike = createAsyncThunk(
  "auth/setUserLike",
  async ({ post }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const sessionUserId = state.auth.user?.id;

      const userDocRef = doc(db, "personnels", post.userId);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        throw new Error("User document does not exist!");
      }

      const userData = userDoc.data();
      const postIndex = userData.posts.findIndex((pst) => pst.id === post.id);

      if (postIndex === -1) {
        throw new Error("Post not found!");
      }

      const selectPost = userData.posts[postIndex];

      const likes = selectPost.likes || [];
      const user = likes.find((id) => id === sessionUserId);

      if (user) {
        selectPost.likes = likes.filter((id) => id !== sessionUserId);
      } else {
        const updatedLikes = [sessionUserId, ...likes];
        selectPost.likes = updatedLikes;
      }

      await updateDoc(userDocRef, {
        posts: userData.posts,
      });

      return { selectPost };
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const postComment = createAsyncThunk(
  "auth/postComment",
  async ({ comment: comment, post: post }, { getState, rejectWithValue }) => {
    const state = getState();
    const userId = state.auth.user?.id;
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
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.isLoginInValidMessage = false;
      state.userDataArray = null;
      state.allPosts = [];
      state.userProfile = null;
    },

    // postComment: (state, action) => {
    //   const { post, comment } = action.payload;
    //   // Belirtilen postID için yorumu bul ve yeni yorumu ekleyin
    //   const postIndex = state.allPosts.findIndex((pst) => pst.id === post.id);
    //   if (postIndex !== -1) {
    //     state.allPosts[postIndex].comments = [
    //       ...state.allPosts[postIndex].comments,
    //       comment,
    //     ];
    //   }

    //   // userDataArray'de de bu gönderiyi güncelle
    //   const userIndex = state.userDataArray.findIndex((user) =>
    //     user.posts.some((post) => post.id === post.id)
    //   );
    //   if (userIndex !== -1) {
    //     const userPostIndex = state.userDataArray[userIndex].posts.findIndex(
    //       (post) => post.id === post.id
    //     );
    //     if (userPostIndex !== -1) {
    //       state.userDataArray[userIndex].posts[userPostIndex].comments = [
    //         ...state.userDataArray[userIndex].posts[userPostIndex].comments,
    //         comment,
    //       ];
    //     }
    //   }
    // },

    postEditComment: (state, action) => {
      const { post, comment } = action.payload;
      // Tüm gönderiler arasında ve ilgili gönderideki yorumu bul ve güncelle
      const postIndex = state.allPosts.findIndex((pst) => pst.id === post.id);
      if (postIndex !== -1) {
        const commentIndex = state.allPosts[postIndex].comments.findIndex(
          (cmt) => cmt.id === comment.id
        );
        if (commentIndex !== -1) {
          state.allPosts[postIndex].comments[commentIndex] = {
            ...state.allPosts[postIndex].comments[commentIndex],
            ...comment,
          };
        }
      }

      // userDataArray'de de bu gönderideki yorumu güncelle
      const userIndex = state.userDataArray.findIndex((user) =>
        user.posts.some((pst) => pst.id === post.id)
      );
      if (userIndex !== -1) {
        const userPostIndex = state.userDataArray[userIndex].posts.findIndex(
          (pst) => pst.id === post.id
        );
        if (userPostIndex !== -1) {
          const commentIndex = state.userDataArray[userIndex].posts[
            userPostIndex
          ].comments.findIndex((cmt) => cmt.id === comment.id);

          if (commentIndex !== -1) {
            state.userDataArray[userIndex].posts[userPostIndex].comments[
              commentIndex
            ] = {
              ...state.userDataArray[userIndex].posts[userPostIndex].comments[
                commentIndex
              ],
              ...comment,
            };
          }
        }
      }
    },

    postRemoveComment: (state, action) => {
      const { postId, updatedCommments } = action.payload;

      const postIndex = state.allPosts.findIndex((pst) => pst.id === postId);
      if (postIndex !== -1) {
        state.allPosts[postIndex].comments = updatedCommments;
      }

      state.userDataArray = state.userDataArray.map((user) => {
        const updatedPosts = user.posts.map((post) => {
          if (post.id === postId) {
            return { ...post, comments: updatedCommments };
          }
          return post;
        });

        return { ...user, posts: updatedPosts };
      });
    },

    removeMember: (state, action) => {
      // Belirtilen üyenin tüm verilerini userDataArray'dan kaldır
      state.userDataArray = state.userDataArray.filter(
        (user) => user.id !== action.payload
      );

      // Üyenin tüm gönderilerini allPosts dizisinden kaldır
      state.allPosts = state.allPosts.filter(
        (post) => post.userId !== action.payload
      );
    },

    setUserDataArray(state, action) {
      state.isLoginInValidMessage = false;
    },

    setLoginInvalidMessage: (state, action) => {
      state.isLoginInValidMessage = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { user, allPosts, userDataArray } = action.payload;
        state.user = user;
        state.allPosts = allPosts;
        state.userDataArray = userDataArray;
        state.isLoggedIn = true;
        state.isLoginInValidMessage = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoggedIn = false;
        state.isLoginInValidMessage = true;
      })
      .addCase(addNewFriend.fulfilled, (state, action) => {
        const { friends, posts } = action.payload;
        state.user.friends = friends;
        state.allPosts = [...posts, ...state.allPosts];
      })
      .addCase(addNewFriend.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeFriend.fulfilled, (state, action) => {
        const { userId, friends } = action.payload;
        if (state.user && state.user.id === userId) {
          state.user.friends = friends;
        }
      })
      .addCase(removeFriend.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(findUser.fulfilled, (state, action) => {
        const { userProfile } = action.payload;
        state.userProfile = userProfile;
      })
      .addCase(findUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(setUserPost.fulfilled, (state, action) => {
        const { post } = action.payload;
        state.allPosts = [post, ...state.allPosts];

        if (state.user.id === post.userId) {
          state.user.posts = [post, ...state.user.posts];
        }
      })
      .addCase(setUserPost.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removePost.fulfilled, (state, action) => {
        const { postId, posts } = action.payload;
        state.allPosts = state.allPosts.filter((post) => post.id !== postId);
        if (posts != null) {
          state.user.posts = posts;
        }
      })
      .addCase(removePost.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(setUserLike.fulfilled, (state, action) => {
        const { selectPost } = action.payload;

        const postIndex = state.allPosts.findIndex(
          (post) => post.id === selectPost.id
        );

        if (postIndex !== -1) {
          state.allPosts[postIndex].likes = selectPost.likes;
        }

        if (state.user.id === selectPost.userId) {
          const userPostIndex = state.user.posts.findIndex(
            (post) => post.id === selectPost.id
          );
          if (userPostIndex !== -1) {
            state.user.posts[userPostIndex].likes = selectPost.likes;
          }
        }
      })
      .addCase(setUserLike.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  logout,
  postEditComment,
  postRemoveComment,
  removeMember,
  setUserDataArray,
  setLoginInvalidMessage,
} = authSlice.actions;

export default authSlice.reducer;
