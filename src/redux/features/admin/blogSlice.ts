import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IBlogPost, IBlogComment } from '@/types/for-admin-type'

export interface InitialState {
    loading: boolean,
    error?: string | null,
    blogs: IBlogPost[],
    blog: IBlogPost | null,
    searchedBlogs:IBlogPost[],
    searchTerm:string,
    totalPages:number,
    totalBlogs:number,
    blogsPerPage:number,
    page:number,
    recentBlogs:IBlogPost[],
}


const initialState: InitialState = {
    loading: false,
    error: null,
    blogs: [],
    blog: null,
    searchedBlogs:[],
    searchTerm:"",
    totalPages:0,
    totalBlogs:0,
    blogsPerPage:0,
    page:1,
    recentBlogs:[],
}

export const blogSlice = createSlice({
    name: 'blogSlice',
    initialState,
    reducers: {
        blogRequestStart: (state) => {
            state.loading = true;
        },
        blogRequestFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        blogRequestSuccess: (state) => {
            state.loading = false;
        },
        getBlogsSuccess: (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.blogs = action.payload.blogs;
            state.totalBlogs = action.payload.totalBlogs;
            state.blogsPerPage = action.payload.blogsPerPage;
            state.totalPages = action.payload.blogsPerPage;

        },
        getBlogByIdSuccess: (state, action: PayloadAction<IBlogPost>) => {
            state.loading = false;
            state.blog = action.payload;
        },
        addCommentSuccess: (state, action: PayloadAction<IBlogComment>) => {
            state.loading = false;
            state.blog?.comments.push(action.payload);
        },
        searchBlogSuccess:(state,action:PayloadAction<IBlogPost[]>) => {
            state.loading=false
            state.searchedBlogs = action.payload;
        },
        setSearchTerm:(state,action:PayloadAction<string>) => {
            state.searchTerm = action.payload;
        },
        setPage:(state,action:PayloadAction<number>) => {
            state.page = action.payload;
        },
        setRecentBlogs:(state,action:PayloadAction<any>) => {
            state.recentBlogs = action.payload.blogs;
        }
    },
})

export const {
    blogRequestFail,
    blogRequestStart,
    blogRequestSuccess,
    getBlogsSuccess,
    getBlogByIdSuccess,
    addCommentSuccess,
    searchBlogSuccess,
    setSearchTerm,
    setRecentBlogs,
    setPage,

} = blogSlice.actions

export default blogSlice.reducer;
