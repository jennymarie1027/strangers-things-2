import React from 'react'
import { Link } from 'react-router-dom'
import '../stylingsheets/app.css'
import '../stylingsheets/homepage.css'

const Homepage = ({token}) => {
    return (
        <main className='marginTop homepage-container'>
            <h1>Welcome To Stranger's Things</h1>
            <div className='homepageBtn-container'>
                <button className='homepageBtn'><Link to='/postforum'>View Posts</Link></button>
                {token 
                ? <>
                    <button className='homepageBtn'><Link to='/profile'>View Profile</Link></button>
                    <button className='homepageBtn'><Link to='/newpost'>Create New Post</Link></button>
                    <button className='homepageBtn'><Link to='/logout'>Logout</Link></button>
                </>
                :   <button className='homepageBtn'><Link to='/login'>Login</Link></button>
                }
               
            </div>
        </main>
    )
}

export default Homepage


