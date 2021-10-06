import React from 'react'
import { handleLogout } from './handleFuncs'

const Logout = ({ setToken, history }) => {
    
    return  ( 
        <button onClick={() => {
            handleLogout();
            setToken('');
            history.push('/login')
        }}
        style={{marginTop: 100 + 'px'}}
        className='btn btn-lg btn-primary btn-block'
        >
            Logout
        </button> 
    )
        
    
}

export default Logout
