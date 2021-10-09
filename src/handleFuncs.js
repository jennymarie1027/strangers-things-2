import { API_URL, minPasswordLength } from "./constants";

function handleHeaders(token) {
    let header;
    if (token) {
        header = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }      
    } else {
        header = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }
    return header;
}
const handleFetchingPosts = async (token) => {
    if (!token) {
        try {
            const res = await fetch(`${API_URL}/posts`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            } );
            const data = await res.json();
            return data
        } catch(err) {
            console.error(err);
        }
    } else if (token) {
        try {
            const res = await fetch(`${API_URL}/posts`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            } );
            const data = await res.json();
            return data
        } catch(err) {
            console.error(err);
        }
    }
   
}


const handleLogout = () => {
    localStorage.removeItem('token')
}

async function handleLogin(username, password){
    try {
        const res = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                user: {
                  username: username,
                  password: password
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
            method: 'POST',
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
        } else {
          alert(`Please make sure your passwords match and are at least ${minPasswordLength} characters long`)
        } 
    } catch(err) {
        console.error(err);
    } 
}

async function handleFetchingUserInfo(token) {
    try {
        const res = await fetch(`${API_URL}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        const data = await res.json();
        return data;
    } catch(err) {
      console.error(err);
    }
}

const handleNewPostSubmit = async (token, newPostTitle, newPostBody, price, location, deliver) => {
    try {
        const res = await fetch(`${API_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
            body: JSON.stringify({
                post: {
                    title: newPostTitle,
                    description: newPostBody,
                    price: price,
                    location: location,
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

const handleDelete = async (token, id) => {
    try {
        const res = await fetch(`${API_URL}/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              }
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
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
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

async function test(token) {
    try {
        const res = await fetch(`${API_URL}/test/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        const data = await res.json();
        console.log(data.data);
    } catch(err) {
        console.err(err);
    }
}

function findPostById(postId, arrayOfPosts) {
    const myPost = arrayOfPosts.find(post => {
        return (post._id == postId)
    })
    return myPost || {};
}

async function handlePostEdit(postID, token, editedTitle, editedDescription, editedPrice, editedLocation, editedDelivery) {
    try {
        const res = await fetch(`${API_URL}/posts/${postID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                post: {
                    title: editedTitle,
                    description: editedDescription,
                    price: editedPrice,
                    location: editedLocation,
                    willDeliver: editedDelivery
                }
            })
        })
        const data = await res.json();
        return data;
    } catch(err) {
        console.log(err);
    }
}


export {
    handleHeaders,
    handleRegister,
    handleLogin,
    handleLogout,
    handleFetchingUserInfo,
    handleFetchingPosts,
    handleDelete,
    handleSubmitMessage,
    handleNewPostSubmit,
    test,
    findPostById,
    handlePostEdit
}