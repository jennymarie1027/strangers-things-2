import React from 'react'

const Logout = ({ token, setToken }) => {
    
    return  ( <>
        {token 
        ? <button onClick={() => {
            localStorage.removeItem('token')
            setToken('');
        }}>
            Logout
        </button> 
        : null}
    </>)
        
    
}

export default Logout
