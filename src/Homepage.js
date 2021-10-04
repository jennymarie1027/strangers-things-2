import React, {useEffect, useState} from 'react'



const Homepage = ({ API_URL, token, isLoggedIn }) => {

    const [name, setName] = useState('')

   useEffect(() => {
    async function welcomeUser() {
        const res = await fetch(`${API_URL}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        console.log(res);
        const parsedData = await res.json();
        console.log(parsedData);
    }
    welcomeUser();

   }, [])
    return (
        <>
        {isLoggedIn && 
        <h1>Welcome to Strangers Things {name}</h1>
        }
        </>
    )
}

export default Homepage
