
import React, { useState } from 'react'
import RegisterForm from './RegisterForm';

const LoginForm = ({
    username, password, setPassword, setUsername, API_URL, setToken, setIsLoggedIn, makeHeaders, token, minPasswordLength
}) => {

    const [isNewUser, setIsNewUser] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/users/login`, {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  user: {
                    username: String({username}),
                    password: String({password})
                  }
                })
              })
            const parsedData = await res.json();
            setToken(parsedData.data.token);
            window.localStorage.setItem('token', JSON.stringify(parsedData.data.token))
            setIsLoggedIn(true)
            setPassword('');
            setUsername('')
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <>
        {!isNewUser 
        ? (
        <form onSubmit={handleLogin}>
                <label htmlFor="username">Username:</label>
                <input 
                placeholder="enter username here" 
                id="username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                />
                <label htmlFor="password">Password:</label>
                <input 
                placeholder="enter password here" 
                id="password"
                type="text"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                />
                <button>Log in!</button>
                <div>
                    <label>Don't have an account?</label>
                    <button onClick={() => setIsNewUser(true)}>New Users Register Here</button>
                </div>
            </form>
        ) : (
            <>
                <RegisterForm minPasswordLength={minPasswordLength} />
                <button onClick={() => setIsNewUser(false)}>I already have a username registered</button>
            </>
        ) }
            
        </>
    )
}

export default LoginForm
