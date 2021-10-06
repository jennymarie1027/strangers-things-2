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
import MessageForm from './MessageForm';
import SinglePost from './SinglePost';
import { findPostById } from './handleFuncs';

const Index = ({match}) => {
  
  const [token, setToken] = useState('');
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState({})
  const [buttonPopUp, setButtonPopUp] = useState(false)
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState('');

  // this useEffect checks is there is a token in browser storage
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) setToken(storedToken);
  }, [])

  // this useEffect initiates an AJAX call on page load to go and get the posts
  useEffect(() => {
    async function getPosts() {
      const res = await fetch(`${API_URL}/posts`);
      const data = await res.json();
      setPosts(data.data.posts);
      setSearchResults(data.data.posts);
    }   
    getPosts(); 
    
  }, [])

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
    console.log('mySelectedPost:', mySelectedPost)
    // setSelectedPost(mySelectedPost);
  }, [])

  return (
  <BrowserRouter>
    <Header token={token} />
    <Route path='/login' exact render={(routeProps) => <Login2 {...routeProps} setToken={setToken} isLoggedIn={!!token} /> } />
    <Route path='/register' exact render={(routeProps) => <Login2 {...routeProps} setToken={setToken} /> }/>
    <Route path='/postforum' exact render={(routeProps) => <PostForum {...routeProps} isLoggedIn={!!token} posts={searchResults} token={token} setPosts={setPosts} buttonPopUp={buttonPopUp} setButtonPopUp={setButtonPopUp} search={search} setSearch={setSearch} searchResults={searchResults} setSearchResults={setSearchResults} setSelectedPost={setSelectedPost}/> } />
    <Route path='/messageform' exact render={() => <MessageForm />} />
    <Route path='/postforum/:postID' exact render={(routeProps) => <SinglePost {...routeProps} posts={searchResults} selectedPost={selectedPost} setSelectedPost={setSelectedPost}/>} />
    <Route path='/newPost' exact render={(routeProps) => <NewPost {...routeProps} isLoggedIn={!!token} posts={posts} setPosts={setPosts} token={token} />} />
    <Route path='/logout' exact render={(routeProps) => <Logout {...routeProps} token={token} setToken={setToken}/>} />
    <Route path='/' exact render={() => <Homepage isLoggedIn={!!token} token={token} />} />
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

// I'm confused in my PostForum => useEffect function that goes and grabs the posts on pageload.
// When I console.log the data recieved from the fetch request, isAuthor reflects is true on posts I wrote, which is the behavior I want
// Then I update my state with setPosts using that data that I recieved,
// and when I console.log(posts) isAuthor's value is false for all posts, even the one I wrote that previously wasn't false.  
// I must be over-riding the isAuthor value when I update my state, but I don't see where.