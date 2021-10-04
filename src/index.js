import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Link } from 'react-router-dom'
import { API_URL } from './constants';
import Login2 from './Login2';
import PostForum from './PostForum'
import Homepage from './Homepage';
import NewPost from './NewPost';
import Logout from './Logout'
import Popup from './Popup';

const Index = () => {
  const minPasswordLength = 6;
  const [token, setToken] = useState('');
  const [posts, setPosts] = useState([]);
  const [buttonPopUp, setButtonPopUp] = useState(false)

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
    }   
    getPosts(); 
    
}, [])
  
  return (
  <BrowserRouter>
    {!token 
    ? ( <>
      <Link to='/login'> Login </Link>
      <Link to='/register'> Register </Link>
    </> ): ( <>
    <Link to='/'>Homepage</Link>
    <Link to='/postforum'>Post Forum</Link>
    <Link to='/newpost'>New Post</Link>
    <Link to='/logout'>Logout</Link>
    </> ) }
    
    
    <Route path='/login' exact render={(routeProps) => <Login2 {...routeProps} setToken={setToken} isLoggedIn={!!token} /> } />
    <Route path='/register' exact render={(routeProps) => <Login2 {...routeProps} setToken={setToken} /> }/>
    <Route path='/postforum' exact render={(routeProps) => <PostForum {...routeProps} isLoggedIn={!!token} posts={posts} token={token} setPosts={setPosts} buttonPopUp={buttonPopUp} setButtonPopUp={setButtonPopUp}/> } />
    
    <Route path='/newPost' exact render={(routeProps) => <NewPost {...routeProps} isLoggedIn={!!token} posts={posts} setPosts={setPosts} token={token} />} />
    <Route path='/logout' exact render={(routeProps) => <Logout {...routeProps} token={token} setToken={setToken}/>} />
    <Route path='/' exact render={() => <Homepage isLoggedIn={!!token} token={token} />} />
  </BrowserRouter>
  )
}


ReactDOM.render(
    <BrowserRouter>
      <Route path='/' component={Index} />
    </BrowserRouter>,
  document.getElementById('app')
);
