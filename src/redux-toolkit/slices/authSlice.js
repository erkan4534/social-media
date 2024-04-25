import { createSlice } from "@reduxjs/toolkit";
import { userData } from "../../data/userData";

const initialState = {
  user: null,
  allPosts: [],
  isLoggedIn: false,
  isLoginInValidMessage: false,
  userDataArray: userData,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, password } = action.payload;
      const userDetailData = state.userDataArray.find(
        (usr) => usr.email === email && usr.password === password
      );

      if (userDetailData) {
        const allFriendPosts = [];
        if (userDetailData.role === "memberUser") {
          const friendPostDataArray = userDetailData.friends
            .map((friendId) =>
              state.userDataArray.find((user) => user.id === friendId)
            )
            .filter(Boolean); // Remove undefined values if any

          friendPostDataArray.forEach((friend) => {
            allFriendPosts.push(...friend.posts);
          });
        } else {
          state.userDataArray.forEach((member) => {
            allFriendPosts.push(...member.posts);
          });
        }

        state.user = userDetailData;
        state.isLoggedIn = true;
        state.isLoginInValidMessage = false;
        state.allPosts = allFriendPosts;
      } else {
        state.isLoginInValidMessage = true;
      }
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.isLoginInValidMessage = false;
      state.userDataArray = userData;
      state.allPosts = [];
    },
    addNewFriend: (state, action) => {
      const { userIdToAdd } = action.payload;
      const userIndex = state.userDataArray.findIndex(
        (user) => user.id === state.user.id
      );
      if (userIndex !== -1) {
        const user = state.userDataArray[userIndex];
        const updatedFriends = [...user.friends, userIdToAdd];
        state.userDataArray[userIndex] = { ...user, friends: updatedFriends };
        state.user = { ...state.user, friends: updatedFriends };
      }
    },
    setUserPost: (state, action) => {
      const newPost = action.payload;
      if (state.user) {
        state.user.posts = [newPost, ...state.user.posts];
        state.allPosts = [newPost, ...state.allPosts];

        const userIndex = state.userDataArray.findIndex(
          (user) => user.id === state.user.id
        );
        if (userIndex !== -1) {
          state.userDataArray[userIndex] = {
            ...state.userDataArray[userIndex],
            posts: [newPost, ...state.userDataArray[userIndex].posts],
          };
        }
      }
    },
    setUserLike: (state, action) => {
      const { postId, userId } = action.payload;
      const postIndex = state.allPosts.findIndex((post) => post.id === postId);
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

    removeFriend: (state, action) => {
      const { friendId } = action.payload;
      // Kullanıcının mevcut arkadaş listesinden belirtilen arkadaşı çıkar
      if (state.user) {
        state.user.friends = state.user.friends.filter((id) => id !== friendId);
      }

      // userDataArray içinde de güncelleme yap
      const userIndex = state.userDataArray.findIndex(
        (user) => user.id === state.user.id
      );
      if (userIndex !== -1) {
        state.userDataArray[userIndex].friends = state.userDataArray[
          userIndex
        ].friends.filter((id) => id !== friendId);
      }
    },
    removeUserPostAndAllPost: (state, action) => {
      const { userId } = action.payload;
      // Kullanıcının tüm gönderilerini sil
      if (state.user && state.user.id === userId) {
        state.user.posts = [];
      }

      // userDataArray'den ve allPosts'dan ilgili kullanıcının tüm gönderilerini kaldır
      state.allPosts = state.allPosts.filter((post) => post.userId !== userId);
      const userIndex = state.userDataArray.findIndex(
        (user) => user.id === userId
      );
      if (userIndex !== -1) {
        state.userDataArray[userIndex].posts = [];
      }
    },
    removeAllPost: (state, action) => {
      // Tüm gönderileri temizle
      state.allPosts = [];
      // Aynı zamanda userDataArray içindeki her kullanıcının gönderilerini de temizle
      state.userDataArray.forEach((user) => (user.posts = []));
    },
    postComment: (state, action) => {
      const { postId, comment } = action.payload;
      // Belirtilen postID için yorumu bul ve yeni yorumu ekleyin
      const postIndex = state.allPosts.findIndex((post) => post.id === postId);
      if (postIndex !== -1) {
        state.allPosts[postIndex].comments = [
          ...state.allPosts[postIndex].comments,
          comment,
        ];
      }

      // userDataArray'de de bu gönderiyi güncelle
      const userIndex = state.userDataArray.findIndex((user) =>
        user.posts.some((post) => post.id === postId)
      );
      if (userIndex !== -1) {
        const userPostIndex = state.userDataArray[userIndex].posts.findIndex(
          (post) => post.id === postId
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
      const { postId, commentId, newComment } = action.payload;
      // Tüm gönderiler arasında ve ilgili gönderideki yorumu bul ve güncelle
      const postIndex = state.allPosts.findIndex((post) => post.id === postId);
      if (postIndex !== -1) {
        const commentIndex = state.allPosts[postIndex].comments.findIndex(
          (comment) => comment.id === commentId
        );
        if (commentIndex !== -1) {
          state.allPosts[postIndex].comments[commentIndex] = {
            ...state.allPosts[postIndex].comments[commentIndex],
            ...newComment,
          };
        }
      }

      // userDataArray'de de bu gönderideki yorumu güncelle
      const userIndex = state.userDataArray.findIndex((user) =>
        user.posts.some((post) => post.id === postId)
      );
      if (userIndex !== -1) {
        const userPostIndex = state.userDataArray[userIndex].posts.findIndex(
          (post) => post.id === postId
        );
        if (userPostIndex !== -1) {
          const commentIndex = state.userDataArray[userIndex].posts[
            userPostIndex
          ].comments.findIndex((comment) => comment.id === commentId);
          if (commentIndex !== -1) {
            state.userDataArray[userIndex].posts[userPostIndex].comments[
              commentIndex
            ] = {
              ...state.userDataArray[userIndex].posts[userPostIndex].comments[
                commentIndex
              ],
              ...newComment,
            };
          }
        }
      }
    },
    removeMember: (state, action) => {
      const { memberId } = action.payload;
      // Belirtilen üyenin tüm verilerini userDataArray'dan kaldır
      state.userDataArray = state.userDataArray.filter(
        (user) => user.id !== memberId
      );

      // Üyenin tüm gönderilerini allPosts dizisinden kaldır
      state.allPosts = state.allPosts.filter(
        (post) => post.userId !== memberId
      );

      // Eğer silinen kullanıcı şu anda giriş yapmış kullanıcı ise, oturumu kapat
      if (state.user && state.user.id === memberId) {
        state.user = null;
        state.isLoggedIn = false;
      }
    },
  },
});

export const {
  login,
  logout,
  addNewFriend,
  setUserPost,
  setUserLike,
  removeFriend,
  removeUserPostAndAllPost,
  removeAllPost,
  postComment,
  postEditComment,
  removeMember,
} = authSlice.actions;

export default authSlice.reducer;
