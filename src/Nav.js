import React from 'react'
import {Link} from 'react-router-dom'

const Nav =  ({token, API_URL}) => {
    // const testFetch = async () => {
    //     const res = await fetch(`${API_URL}/test/data`, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token}`
    //         }
    //     });
    //     const data = await res.json();
    //     console.log(`the date from the test:`, data)
    // }
    // testFetch();

    return (
    <>
     
        
        <ul>
            <li><Link to="/">NEW POST</Link></li>
            <li><Link to="/posts">VIEW POSTS</Link></li>
        </ul>
    </>
    )
}

export default Nav
