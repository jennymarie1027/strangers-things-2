import { API_URL } from "./constants";

const handleLogout = (token) => {
    localStorage.removeItem(token)
}

async function handleLogin(username, password){
    // pass username and password to the API
    // it gives you a token back, save that to the users broswer & update state with it
    try {
        const res = await fetch(`${API_URL}/users/login`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user: {
                username,
                password
              }
            })
          })
        const parsedData = await res.json();
        return parsedData;
    } catch(err) {
        console.log(err);
    }
}

async function handleRegister(username, password, confirmedPassword){
    try {
        if ((password === confirmedPassword) && (password.length >= 6)) {
        const res = await fetch(`${API_URL}/users/register`, {
            method: "POST",
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
              user: {
                username,
                password
              }
            })
          })
        const parsedData = await res.json();
        return parsedData;
        } else {
          alert('Please make sure your passwords match and are at least 6 characters long')
        } 
    } catch(err) {
        console.log(err);
    } 
}

async function handleFetchingUserInfo() {
    const myToken = window.localStorage.getItem('token')
    const res = await fetch(`${API_URL}/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ myToken
        },
      })
      const data = await res.json();
      return data;
}

const handleNewPostSubmit = async (e, token, newPostTitle, newPostBody, price, deliver) => {
    e.preventDefault();
    try {
        const res = await fetch(`${API_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                post: {
                    title: newPostTitle,
                    description: newPostBody,
                    price: price,
                    willDeliver: deliver
                }
            })
        })
        return await res.json();
       
    } catch (err) {
        console.log(err)
    }
}

const handleNewPosts = async (token) => {
    const res = await fetch(`${API_URL}/posts`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data
}


const handleDelete = async (id, token) => {
    const res = await fetch(`${API_URL}/posts/${id}`, {
        method: "Delete",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    const data = await res.json();
    return data;
}

const handleSubmitMessage = async (token, id, content) => {
    const res = await fetch(`${API_URL}/posts/${id}/messages`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            message: {
                content: content
            },
        })
    })
    const data = await res.json();
    return data;
}

const lookMeUp = async (token) => {
    const res = await fetch(`${API_URL}/users/me`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const data = await res.json();
    return data;
}


export {
    handleRegister,
    handleLogin,
    handleLogout,
    handleFetchingUserInfo,
    handleNewPosts,
    handleDelete,
    handleSubmitMessage,
    handleNewPostSubmit,
    lookMeUp,
    
}