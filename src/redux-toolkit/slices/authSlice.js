import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  query,
  where,
  documentId,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { userLogin, userLogout } from "./userSlice";

const initialState = {
  isLoggedIn: false,
  isLoginInValidMessage: false,
};

export const login = createAsyncThunk(
  "authSlice/login",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    let allPosts = [];
    const userDataArray = [];

    try {
      const userDetailDataQuery = query(
        collection(db, "personnels"),
        where("email", "==", email),
        where("password", "==", password),
        where("status", "==", 1)
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
      }

      const allMembersQuery = query(collection(db, "personnels"));

      const allMembersDocs = await getDocs(allMembersQuery);

      allMembersDocs.forEach((doc) => {
        userDataArray.push({ id: doc.id, ...doc.data() });
      });

      dispatch(
        userLogin({
          user: userDetailData[0],
          allPosts: allPosts,
          userDataArray: userDataArray,
        })
      );

      return {};
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  "authSlice/logout",
  async (_, { dispatch }) => {
    dispatch(userLogout());
  }
);

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUserDataArray(state) {
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
      .addCase(login.fulfilled, (state) => {
        state.isLoggedIn = true;
        state.isLoginInValidMessage = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoggedIn = false;
        state.isLoginInValidMessage = true;
      })

      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.isLoginInValidMessage = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setUserDataArray, setLoginInvalidMessage } = authSlice.actions;

export default authSlice.reducer;
