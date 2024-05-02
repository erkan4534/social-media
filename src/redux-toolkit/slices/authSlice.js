import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userData } from "../../data/userData";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
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
            where("id", "in", userDetailData[0].friends)
          );

          const querUserFriends = await getDocs(userDetailDataQuery);
          querUserFriends.forEach((doc) => {
            friendsData.push(doc.data());
          });
        }

        allPosts = [
          ...userDetailData[0].posts,
          ...friendsData.map((friend) => friend.posts),
        ];

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
      const updatedFriends = [...userData.friends, friendId];

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

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.isLoginInValidMessage = false;
      state.userDataArray = userData;
      state.allPosts = [];
    },
    setUserPost: (state, action) => {
      const newPost = action.payload;

      if (state.user) {
        state.user.posts = [
          newPost,
          ...(state.user.posts ? state.user.posts : []),
        ];
        state.allPosts = [newPost, ...state.allPosts];

        const userIndex = state.userDataArray.findIndex(
          (user) => user.id === state.user.id
        );
        if (userIndex !== -1) {
          state.userDataArray[userIndex] = {
            ...state.userDataArray[userIndex],
            posts: [
              newPost,
              ...(state.userDataArray[userIndex].posts
                ? state.userDataArray[userIndex].posts
                : []),
            ],
          };
        }
      }
    },
    setUserLike: (state, action) => {
      const { post, userId } = action.payload;
      const postIndex = state.allPosts.findIndex((pst) => pst.id === post.id);
      if (postIndex !== -1) {
        const post = state.allPosts[postIndex];
        const isLiked = post.likes.includes(userId);
        if (isLiked) {
          // Kullanıcı bu postu daha önce beğenmişse, beğeniyi geri al
          post.likes = post.likes.filter((id) => id !== userId);
        } else {
          // Kullanıcı bu postu beğenmemişse, beğeniyi ekle
          post.likes.push(userId);
        }
      }
    },

    removeUserPostAndAllPost: (state, action) => {
      const { userPosts, removePostId } = action.payload;

      state.allPosts = state.allPosts.filter(
        (post) => post.id !== removePostId
      );
      state.user.posts = userPosts;
      const userIndex = state.userDataArray.findIndex(
        (user) => user.id === state.user.id
      );
      if (userIndex !== -1) {
        state.userDataArray[userIndex].posts = state.userDataArray[
          userIndex
        ].posts.filter((id) => id !== removePostId);
      }
    },
    removeAllPost: (state, action) => {
      state.allPosts = action.payload.allnewPosts;
    },
    postComment: (state, action) => {
      const { post, comment } = action.payload;
      // Belirtilen postID için yorumu bul ve yeni yorumu ekleyin
      const postIndex = state.allPosts.findIndex((pst) => pst.id === post.id);
      if (postIndex !== -1) {
        state.allPosts[postIndex].comments = [
          ...state.allPosts[postIndex].comments,
          comment,
        ];
      }

      // userDataArray'de de bu gönderiyi güncelle
      const userIndex = state.userDataArray.findIndex((user) =>
        user.posts.some((post) => post.id === post.id)
      );
      if (userIndex !== -1) {
        const userPostIndex = state.userDataArray[userIndex].posts.findIndex(
          (post) => post.id === post.id
        );
        if (userPostIndex !== -1) {
          state.userDataArray[userIndex].posts[userPostIndex].comments = [
            ...state.userDataArray[userIndex].posts[userPostIndex].comments,
            comment,
          ];
        }
      }
    },
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
      //state.userDataArray = [...state.userDataArray, action.payload];
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
        const { userId, friends } = action.payload;
        if (state.user && state.user.id === userId) {
          state.user.friends = friends;
        }
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
      });
  },
});

export const {
  logout,
  setUserPost,
  setUserLike,
  removeUserPostAndAllPost,
  removeAllPost,
  postComment,
  postEditComment,
  postRemoveComment,
  removeMember,
  setUserDataArray,
  setLoginInvalidMessage,
} = authSlice.actions;

export default authSlice.reducer;
