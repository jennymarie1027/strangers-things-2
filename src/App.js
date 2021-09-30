import React, {useEffect, useState} from 'react'
import {Route, Switch} from 'react-router-dom'
import Post from './Post';
import LoginForm from './LoginForm';
import NewPost from './NewPost';
import Nav from './Nav';

const App = () => {
    const API_URL = 'https://strangers-things.herokuapp.com/api/2107-CSU-RM-WEB-PT';
    const minPasswordLength = 6;
    const [posts, setPosts] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        const posts = async () => {
            const res = await fetch(`${API_URL}/posts`);
            const data = await res.json();
            setPosts(data.data.posts);
        }
        posts();
    }, [])

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('token')
        setToken('');
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
                    <Post posts={posts}/>
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
            />)}
        </div>
    )
}

export default App
