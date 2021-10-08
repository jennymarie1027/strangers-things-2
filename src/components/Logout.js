import React from 'react'
import { handleLogout } from '../handleFuncs'
import '../stylingsheets/app.css'
import '../stylingsheets/login.css'

const Logout = ({ setToken, history }) => {
    
    return  ( 
        <main className='formContainer'>
            <h1>Oh No! You're Leaving...  Are You Sure?</h1>
            <button className='btn btn-lg btn-primary btn-block mt-4' 
                onClick={() => {
                handleLogout();
                setToken('');
                history.push('/login')
            }}>Yes, Log Me Out</button> 
        </main>
    )
        
    
}

export default Logout
