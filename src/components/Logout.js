import React from 'react'
import { handleLogout } from '../handleFuncs'
import '../stylingsheets/app.css'
import '../stylingsheets/login.css'

const Logout = ({ setToken, history }) => {
    
    return  ( 
        <div className='formContainer'>
            <h1>Oh no! You're Leaving...Are You Sure?</h1>
            <button className='btn btn-lg btn-primary btn-block' 
                onClick={() => {
                handleLogout();
                setToken('');
                history.push('/login')
            }}>Yes, Log Me Out</button> 
        </div>
    )
        
    
}

export default Logout
