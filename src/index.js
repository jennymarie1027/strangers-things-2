import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route } from 'react-router-dom'
import { API_URL } from './constants';
import Login2 from './Login2';
import PostForum from './PostForum'
import Homepage from './Homepage';
import NewPost from './NewPost';
import Logout from './Logout'
import Header from './Header'
import Footer from './Footer';
import SinglePost from './SinglePost';
import { findPostById, handleFetchingPosts } from './handleFuncs';

const Index = ({match}) => {
  
  const [token, setToken] = useState('');
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState({})
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');

  // this useEffect checks is there is a token in browser storage
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken);
    }
    if (!storedToken) setToken('');
  })
  
  // this useEffect initiates an AJAX call on page load to go and get the posts
  useEffect(() => {
    async function getPosts() {
      const data = await handleFetchingPosts(token);
      setPosts(data.data.posts);
      setSearchResults(data.data.posts);
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
    <Route path='/login' exact render={(routeProps) => <Login2 {...routeProps} setToken={setToken} isLoggedIn={!!token} /> } />
    <Route path='/register' exact render={(routeProps) => <Login2 {...routeProps} setToken={setToken} /> }/>
    <Route path='/postforum' exact render={(routeProps) => <PostForum {...routeProps} isLoggedIn={!!token} posts={searchResults} token={token} setPosts={setPosts} search={search} setSearch={setSearch} searchResults={searchResults} setSearchResults={setSearchResults} setSelectedPost={setSelectedPost}/> } />
    <Route path='/postforum/:postID' exact render={(routeProps) => <SinglePost {...routeProps} message={message} setMessage={setMessage} posts={searchResults} selectedPost={selectedPost} setSelectedPost={setSelectedPost}/>} />
    <Route path='/newPost' exact render={(routeProps) => <NewPost {...routeProps} isLoggedIn={!!token} posts={posts} setPosts={setPosts} token={token} />} />
    <Route path='/logout' exact render={(routeProps) => <Logout {...routeProps} token={token} setToken={setToken}/>} />
    <Route path='/' exact render={(routeProps) => <Homepage {...routeProps} isLoggedIn={!!token} token={token} message={message} setMessage={setMessage} />} />
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
