import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route } from 'react-router-dom'
import Login from './components/Login';
import PostForum from './components/PostForum'
import Profile from './components/Profile';
import NewPost from './components/NewPost';
import Logout from './components/Logout'
import Header from './components/Header'
import Footer from './components/Footer';
import SinglePost from './components/SinglePost';
import Homepage from './components/Homepage';
import { findPostById, handleFetchingPosts } from './handleFuncs';
import EditedPost from './components/EditedPost';

const Index = ({match}) => {
  
  const [token, setToken] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedPost, setSelectedPost] = useState({})
  const [message, setMessage] = useState('');

  
  // this useEffect checks is there is a token in browser storage
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken);
    }
    if (!storedToken) setToken('');
  }, [])
  
  // this useEffect initiates an AJAX call whenever the token changes
  useEffect(() => {
    async function getPosts() {
      const data = await handleFetchingPosts(token);
      const reversedPosts = data.data.posts.reverse();
      setPosts(reversedPosts);
      setSearchResults(reversedPosts);
    }   
    getPosts(); 
  }, [token])

  useEffect(() => {
    let filteredResults;
    {posts.length 
     ? filteredResults = posts.filter(post =>
        ((post.description).toLowerCase()).includes(search.toLowerCase())
        || ((post.title).toLowerCase()).includes(search.toLowerCase()))
      : null
   }
    setSearchResults(filteredResults);
  }, [search])

  useEffect(() => {
    const postID = (match.params.postID);
    const mySelectedPost = findPostById(postID, posts);
    setSelectedPost(mySelectedPost);
  }, [])

  return (
  <BrowserRouter>
    <Header token={token} />
    <Route path='/login' exact render={(routeProps) => <Login {...routeProps} setToken={setToken} isLoggedIn={!!token} /> } />
    <Route path='/register' exact render={(routeProps) => <Login {...routeProps} setToken={setToken} /> }/>
    <Route path='/postforum' exact render={(routeProps) => <PostForum {...routeProps} isLoggedIn={!!token} posts={searchResults} token={token} setPosts={setPosts} search={search} setSearch={setSearch} setSearchResults={setSearchResults} setSelectedPost={setSelectedPost}/> } />
    <Route path='/editedpost/:postID' exact render={(routeProps) => <EditedPost {...routeProps} token={token} setSearchResults={setSearchResults} setPosts={setPosts} posts={posts} setSelectedPost={setSelectedPost} selectedPost={selectedPost}/>}/>
    <Route path='/postforum/:postID' exact render={(routeProps) => <SinglePost {...routeProps} message={message} setMessage={setMessage} posts={searchResults} selectedPost={selectedPost} setSelectedPost={setSelectedPost}/>} />
    <Route path='/newPost' exact render={(routeProps) => <NewPost {...routeProps} posts={posts} setPosts={setPosts} token={token} setSearchResults={setSearchResults} searchResults={searchResults} />} />
    <Route path='/logout' exact render={(routeProps) => <Logout {...routeProps} setToken={setToken}/>} />
    <Route path='/profile' exact render={(routeProps) => <Profile {...routeProps} token={token} message={message} setMessage={setMessage} />} />
    <Route path='/' exact render={() => <Homepage token={token} />}/>
    <Footer />
  </BrowserRouter>
  )
}


ReactDOM.render(
    <BrowserRouter>
      <Route path='/' component={Index} />
    </BrowserRouter>,
  document.getElementById('app')
);
