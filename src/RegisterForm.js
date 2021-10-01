
import React, { useState } from 'react'

const RegisterForm = ({ API_URL, setIsLoggedIn, setPassword, setUsername, minPasswordLength, setToken }) => {

  const [newUsername, setNewUsername] = useState('');
  const [newPasswordV1, setNewPasswordV1] = useState('');
  const [newPasswordV2, setNewPasswordV2] = useState('');

  const handleNewUserLogin = async (e) => {
    e.preventDefault();
    try {
      if ((newPasswordV1 === newPasswordV2) && (newPasswordV1.length >= minPasswordLength)) {
        const res = await fetch(`${API_URL}/users/register`, {
          method: "POST",
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            user: {
              username: {newUsername},
              password: {newPasswordV1}
            }
          })
        })
        const parsedData = await res.json();
        setToken(parsedData.data.token);
        window.localStorage.setItem('token', JSON.stringify(token))
        setIsLoggedIn(true)
        setUsername(newUsername);
        setPassword(newPasswordV1);
        setNewUsername('')
        setNewPasswordV1('')
        setNewPasswordV2('')
        } else {
        alert('Please make sure your passwords match and are at least 6 characters long')
        } 
    } catch(err) {
      console.log(err);
    } 
  }
  return (
        <form 
        onSubmit={handleNewUserLogin}
        >
            <label htmlFor="username">Enter New Username:</label>
            <input
              type="text"
              required
              id="username"
              placeholder="enter username here"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <label htmlFor="password">Create Password:</label>
            <input
              type="text"
              required
              id="password"
              placeholder="enter password here"
              value={newPasswordV1}
              onChange={(e) => setNewPasswordV1(e.target.value)}
            />
            <label htmlFor="password">Confirm Password:</label>
              <input
              type="text"
              required
              id="password"
              placeholder="confirm password"
              value={newPasswordV2}
              onChange={(e) => setNewPasswordV2(e.target.value)}
            />
            <button>Sign Up</button>
        </form>
    )
}

export default RegisterForm
