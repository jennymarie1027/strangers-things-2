import { API_URL, minPasswordLength } from "./constants";

const handleLogout = (token) => {
    localStorage.removeItem(token)
}

async function handleLogin(username, password){
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
        console.error(err);
    }
}

async function handleRegister(username, password, confirmedPassword){
    try {
        if ((password === confirmedPassword) && (password.length >= minPasswordLength)) {
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
          alert(`Please make sure your passwords match and are at least ${minPasswordLength} characters long`)
        } 
    } catch(err) {
        console.error(err);
    } 
}

async function handleFetchingUserInfo() {
    try {
        const myToken = window.localStorage.getItem('token')
        const res = await fetch(`${API_URL}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ myToken
            },
        })
        const data = await res.json();
        return data;
    } catch(err) {
      console.error(err);
    }
}

const handleNewPostSubmit = async (e, token, newPostTitle, newPostBody, price, deliver) => {
    e.preventDefault();
    const myToken = window.localStorage.getItem('token')
    try {
        const res = await fetch(`${API_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + myToken
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
        const data = await res.json();
        return data;
    } catch (err) {
        console.error(err)
    }
}

const handleFetchingPosts = async (token) => {
    try {
        const myToken = window.localStorage.getItem('token')
        const res = await fetch(`${API_URL}/posts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + myToken
            }
        });
        const data = await res.json();
        return data
    } catch(err) {
        console.error(err);
    }
}


const handleDelete = async (id, token) => {
    try {
        const res = await fetch(`${API_URL}/posts/${id}`, {
            method: "Delete",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        const data = await res.json();
        return data;
    } catch (err) {
        console.error(err);
    }
}

const handleSubmitMessage = async (token, id, content) => {
    try {
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
    } catch(err) {
        console.error(err);
    }
}

const lookMeUp = async (token) => {
   try {
        const res = await fetch(`${API_URL}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await res.json();
        return data;
   } catch(err) {
       console.error(err);
   }
}

async function test() {
    try {
        const myToken = window.localStorage.getItem('token')
        const res = await fetch(`${API_URL}/test/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + myToken
            },
        })
        const data = await res.json();
        console.log(data.data);
    } catch(err) {
        console.err(err);
    }
}

export {
    handleRegister,
    handleLogin,
    handleLogout,
    handleFetchingUserInfo,
    handleFetchingPosts,
    handleDelete,
    handleSubmitMessage,
    handleNewPostSubmit,
    lookMeUp,
    
}