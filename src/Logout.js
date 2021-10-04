import React from 'react'

const Logout = ({ token, setToken, history }) => {
    
    return  ( <>
        {token 
        ? <button onClick={() => {
            localStorage.removeItem('token')
            setToken('');
            history.push('/login')
        }}>
            Logout
        </button> 
        : null}
    </>)
        
    
}

export default Logout
