import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { handleLogin, handleRegister} from '../handleFuncs'
import '../stylingsheets/login.css'

const Login = ({ isLoggedIn, setToken, match, history }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');

    return (
        <>
        {!isLoggedIn && 
        <div className='text-center mt-5' >
        <form 
          onSubmit={async (e) => {
              e.preventDefault();
              if (match.url === '/register') {
                try {
                  const parsedData = await handleRegister('POST', username, password, confirmedPassword)
                  setToken(parsedData.data.token);
                  window.localStorage.setItem('token', token);
                  setUsername(username);
                  setPassword(password);
                  history.push('/');
                } catch (err) {
                  if (err) alert('That username is already taken')
                  setPassword('');
                  setUsername('');
                }

              }
              if (match.url === '/login') {
                try {
                  const parsedData = await handleLogin(username, password);
                  setToken(parsedData.data.token);
                  window.localStorage.setItem('token', parsedData.data.token)
                  setUsername(username);
                  setPassword(password);
                  history.push('/');
                } catch (err) {
                  console.log(err);
                  if (err) alert('That username & password combo does not exist');
                  setToken('')
                  setPassword('');
                  setUsername('');
                }
              }
          }}
          style={{maxWidth: 50 + 'vw', margin: 'auto', marginTop: 20 + 'vh'}}
        >
          <h1 className='m-3 '>Please Sign In</h1>
            <div>
                {/* <label className='sr-only' htmlFor='username'>Username</label> */}
                <input
                    type='text'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    id='username'
                    required
                    placeholder='Your Username'
                    className='form-control mb-2'
                    autoFocus
                />
            </div>
            <div>
                {/* <label className='sr-only' htmlFor='password'>Password</label> */}
                <input 
                    type='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    id='password'
                    placeholder='Enter Password'
                    required
                    className='form-control mb-2'
                />
            </div>
            {/* if they're at the register page, show the input field to confirm password */}
            {match.url === '/register' 
            ? (<div>
                {/* <label className='sr-only' htmlFor='confirmedPassword'>Confirm Password</label> */}
                <input 
                    type='password'
                    value={confirmedPassword}
                    onChange={e => setConfirmedPassword(e.target.value)}
                    id='confirmedPassword'
                    placeholder='Confirm Password'
                    className='form-control mb-2'
                />
            </div>
            ) : null }
           
                <button type='submit' className='btn btn-lg btn-primary btn-block mt-4'>Sign In</button>
                {
                  match.url === '/register' ?
                  
                  <div className='mt-3'> <Link to='/login'>Already have an account? </Link></div>
                    : <div className='mt-3'><Link to='register'>Don't have an account?</Link></div>
                    
                }
          
        </form>
        </div>
        }
        </>
        
    )
}



export default Login
