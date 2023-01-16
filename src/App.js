import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import PostDetail from "./components/PostDetail/PostDetail";
import Search from "./components/Search/Search";
import Admin from "./components/Admin/Admin";
import AddPost from "./components/AddPost/AddPost";
import AddComment from "./components/AddComment/AddComment";
import Footer from "./components/Footer/Footer";
import UpdateUser from "./components/UpdateUser/UpdateUser";
import UpdatePost from "./components/UpdatePost/UpdatePost";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/post/:_id" element={<PostDetail />} />
          <Route path="/search/:postName" element={<Search />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/addPost" element={<AddPost />} />
          <Route path="/addComment/:_id" element={<AddComment />} />
          <Route path="/UpdateUser/:_id" element={<UpdateUser />} />
          <Route path="/UpdatePost/:_id" element={<UpdatePost />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
