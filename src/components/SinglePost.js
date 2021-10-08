import React, { useEffect } from 'react'
import { findPostById, handleSubmitMessage } from '../handleFuncs';

const SinglePost = ({ selectedPost, setSelectedPost, match, history, posts, message, setMessage }) => {
    
    useEffect(() => {
        const postID = match.params.postID
        if (posts){
            const foundPost = findPostById(postID, posts)
            setSelectedPost(foundPost);
        }
    }, [posts])

    return (
        <main style={{width: 100 + 'vw', margin: 'auto'}}>
            <h1 style={{marginTop: 30 + 'vh'}}>{selectedPost.title}</h1>
            <p>Description: {selectedPost.description}</p>
            <p>Price: {selectedPost.price}</p>
            <form onSubmit={(e => {
                e.preventDefault()
                const postID = match.params.postID;
                const token = localStorage.getItem('token');
                handleSubmitMessage(token, postID, message);
                setMessage('');
                history.push('/postforum')
            })}>
                <label htmlFor="message">Message:</label>
                <input 
                type="text"
                placeholder='enter message here'
                required
                id="message"
                value={message}
                onChange={e => setMessage(e.target.value)
                }
                />
            <button>Send Message</button>
            </form>
        </main>
    )
}

export default SinglePost
