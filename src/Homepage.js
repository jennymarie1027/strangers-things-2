import React, {useEffect, useState} from 'react'
import { handleNewPosts, handleNewPostSubmit, lookMeUp } from './handleFuncs'
import { API_URL } from './constants'

const Homepage = ({ token }) => {

        async function getInfo() {
            // const myToken = window.localStorage.getItem('token')
            const res = await fetch(`${API_URL}/users/me`, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer '+ token
                },
              })
              const data = await res.json();
              console.log(data);
        }
        getInfo();

    return (
        <h1>Welcome to Stranger's Things :)</h1>
    )
}

export default Homepage
