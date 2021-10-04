import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { API_URL } from './constants'
import { handleLogin, handleRegister, handleLogout} from './handleFuncs'

const Login2 = ({ isLoggedIn, setToken, match }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');

    return (
        <>
        {!isLoggedIn && <form 
          onSubmit={async (e) => {
              e.preventDefault();
              if (match.url === '/register') {
                try {
                  const parsedData = await handleRegister(username, password, confirmedPassword, setToken)
                  setToken(parsedData.data.token);
                  window.localStorage.setItem('token', token);
                  setUsername(username);
                  setPassword(password);
                } catch (err) {
                  if (err) alert('That username is already taken')
                  setPassword('');
                  setUsername('');
                }

              }
              if (match.url === '/login') {
                try {
                  const parsedData = await handleLogin(username, password, setToken);
                  setToken(parsedData.data.token);
                  window.localStorage.setItem('token', parsedData.data.token)
                  setUsername(username);
                  setPassword(password);
                } catch (err) {
                  if (err) alert('That username & password combo does not exist');
                  setPassword('');
                  setUsername('');
                }
              }
          }}
        >
            <div>
                <label htmlFor='username'>Username</label>
                <input
                    type='text'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    id='username'
                    placeholder="your username"
                />
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input 
                    type='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    id='password'
                    placeholder=''
                />
            </div>
            {/* if they're at the register page, show the input field to confirm password */}
            {match.url === '/register' 
            ? (<div>
                <label htmlFor='confirmedPassword'>Confirm Password</label>
                <input 
                    type='password'
                    value={confirmedPassword}
                    onChange={e => setConfirmedPassword(e.target.value)}
                    id='confirmedPassword'
                    placeholder=''
                />
            </div>
            ) : null }
            <div>
                <button type='submit'>Submit</button>
                {
                    match.url === '/register' ?
                    <Link to='/login'>Already have an account? </Link>
                    : <Link to='register'>Don't have an account?</Link>
                }
            </div>
        </form>}
        </>
        
    )
}



export default Login2
