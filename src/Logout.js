import React from 'react'

const Logout = ({ token, setToken, history }) => {
    
    return  ( <>
        {token 
        ? <button onClick={() => {
            localStorage.removeItem('token')
            setToken('');
            history.push('/login')
        }}
        style={{marginTop: 100 + 'px'}}
        >
            Logout
        </button> 
        : null}
    </>)
        
    
}

export default Logout
