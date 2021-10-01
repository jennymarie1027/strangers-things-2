import React, {useEffect, useState} from 'react'
import {Route, Switch} from 'react-router-dom'
import Post from './Post';
import LoginForm from './LoginForm';
import NewPost from './NewPost';
import Nav from './Nav';
import MessageForm from './MessageForm';

const App = () => {
    const API_URL = 'https://strangers-things.herokuapp.com/api/2107-CSU-RM-WEB-PT';
    const minPasswordLength = 6;
    const [posts, setPosts] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [message, setMessage] = useState('');
    const [isMessageDisplayed, setIsMessageDisplayed] = useState(false);

    useEffect(() => {
        const posts = async () => {
            const res = await fetch(`${API_URL}/posts`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await res.json();
            setPosts(data.data.posts);
        }
        posts();
    }, [posts])

    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        if (storedToken) setToken(storedToken);
    }, [])

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('token')
        setToken('');
    }

    const handleDelete = async (id) => {
        const res = await fetch(`${API_URL}/posts/${id}`, {
            method: "Delete",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        await res.json();
        console.log('before the filter:', posts)
        const postsList = posts.filter(post => post.id !== id);
        setPosts(postsList);
        console.log('after filter method:', posts)
    }

    const handleInitializingMessage = (id) => {
        console.log('post id:', id)
    }

    const handleSubmitMessage = async () => {
        const res = await fetch(`${API_URL}/posts/${id}/messages`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                message: {
                    content: content
                },
            })
        })
    }

    return (
        <div>
            { token ? (
            <>
                <Nav token={token} API_URL={API_URL} />
                <button onClick={handleLogout}>LOGOUT</button>
                <Route exact path='/'>
                    <NewPost 
                    posts={posts}
                    setPosts={setPosts}
                    API_URL={API_URL}
                    token={token}
                    /> 
                </Route>
               <Route exact path='/posts'>
                    <Post 
                    posts={posts}
                    handleDelete={handleDelete}
                    handleInitializingMessage={handleInitializingMessage}
                    message={message}
                    setMessage={setMessage}
                    isMessageDisplayed={isMessageDisplayed}
                    setIsMessageDisplayed={setIsMessageDisplayed}
                    />
               </Route>
               
            </> 
            ) : (
                <LoginForm
                    username={username} 
                    password={password} 
                    setUsername={setUsername}
                    setPassword={setPassword}
                    API_URL={API_URL}
                    token={token}
                    setToken={setToken}
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                    minPasswordLength={minPasswordLength}
            />)}
        </div>
    )
}

export default App
