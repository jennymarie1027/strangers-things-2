import React from 'react'
import { handleDelete, handleLogout } from './handleFuncs'

const Logout = ({ token, setToken }) => {
    
    return  ( <>
        {token 
        ? <button onClick={() => {
            handleLogout(token)
            setToken('');
        }}>
            Logout
        </button> 
        : null}
    </>)
        
    
}

export default Logout
