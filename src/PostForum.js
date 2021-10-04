import React, { useEffect } from 'react'
import MessageForm from './MessageForm'
import { API_URL } from './constants';
import { handleDelete, lookMeUp } from './handleFuncs';

const PostForum = ({posts, handleInitializingMessage, isMessageDisplayed, token, setPosts}) => {
 
    const deletedPost = (id) => {
        handleDelete(id, token);
        const postsList = posts.filter(post => post.id !== id);
        setPosts(postsList);
    }

    useEffect((token) => {
        const myToken = window.localStorage.getItem('token')
        console.log('token:', token);
        const lookMeUp = async () => {
            const res = await fetch(`${API_URL}/users/me`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + myToken
                }
            })
            console.log(res);
            const data = await res.json();
            console.log(data);
            // return data;
        }
        
        lookMeUp();
    }, [])

    return (
        <main>
            {posts.map(post => (
                <article key={post._id}>
                    <h1>{post.title}</h1>
                    <p>{post.description}</p>
                    <p>{post.price}</p>
                    {post.isAuthor 
                        ? <button onClick={() => deletedPost(post._id)}>Delete</button>
                        : <button onClick={() => handleInitializingMessage(post._id) }>
                        Send Message
                        </button>
                    }
                </article>
            ))}
        </main>
    )
}

export default PostForum
