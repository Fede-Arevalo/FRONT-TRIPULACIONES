import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postsService from "./postsService";

const initialState = {
  posts: [],
  post: {},
  isLoading: false,
};

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData) => {
    try {
      return await postsService.createPost(postData);
    } catch (error) {
      console.error(error);
    }
  }
);

export const getAllPosts = createAsyncThunk("posts/getAllPosts", async () => {
  try {
    return await postsService.getAllPosts();
  } catch (error) {
    console.error(error);
  }
});

export const getPostById = createAsyncThunk(
  "posts/getPostById",
  async (_id) => {
    try {
      return await postsService.getPostById(_id);
    } catch (error) {
      console.error(error);
    }
  }
);

export const getPostByName = createAsyncThunk(
  "posts/getPostByName",
  async (postName) => {
    try {
      return await postsService.getPostByName(postName);
    } catch (error) {
      console.error(error);
    }
  }
);


export const updatePostById = createAsyncThunk(
  "posts/updatePostById",
  async (_id) => {
    try {
      return await postsService.updatePostById(_id);
    } catch (error) {
      console.error(error);
    }
  }
);

export const deletePost = createAsyncThunk("posts/deletePost", async (_id) => {
  try {
    return await postsService.deletePost(_id);
  } catch (error) {
    console.error(error);
  }
});

export const deletePostAdmin = createAsyncThunk(
  "posts/deletePostAdmin",
  async (_id) => {
    try {
      return await postsService.deletePostAdmin(_id);
    } catch (error) {
      console.error(error);
    }
  }
);

export const like = createAsyncThunk("posts/like", async (_id) => {
  try {
    return await postsService.like(_id);
  } catch (error) {
    console.error(error);
  }
});

export const dislike = createAsyncThunk("posts/dislike", async (_id) => {
  try {
    return await postsService.dislike(_id);
  } catch (error) {
    console.error(error);
  }
});

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.fulfilled, (state, action) => {
        state.post = action.payload;
      })

      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })

      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getPostById.fulfilled, (state, action) => {
        state.post = action.payload;
      })

      .addCase(getPostByName.fulfilled, (state, action) => {
        state.posts = action.payload;
      })

      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload.post._id
        );
      })

      .addCase(updatePostById.fulfilled, (state, action) => {
        state.post = action.payload.post;
      })

      .addCase(deletePostAdmin.fulfilled, (state, action) => {
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload.post._id
        );
      })

      .addCase(like.fulfilled, (state, action) => {
        const posts = state.posts.map((post) => {
          if (post._id === action.payload._id) {
            post = action.payload;
          }
          return post;
        });
        state.posts = posts;
      })

      .addCase(dislike.fulfilled, (state, action) => {
        const posts = state.posts.map((post) => {
          if (post._id === action.payload._id) {
            post = action.payload;
          }
          return post;
        });
        state.posts = posts;
      });
  },
});

export const { reset } = postsSlice.actions;

export default postsSlice.reducer;
