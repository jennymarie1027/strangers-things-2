import React, { useEffect } from 'react'
import { findPostById } from './handleFuncs';

const SinglePost = ({ selectedPost, setSelectedPost, match, posts }) => {
    useEffect(() => {
        const postID = match.params.postID
        if (posts){
            const foundPost = findPostById(postID, posts)
            setSelectedPost(foundPost);
        }
    }, [posts])
    return (
        <>
            <h1 style={{marginTop: 30 + 'vh'}}>{selectedPost.title}</h1>
            <p>Description: {selectedPost.description}</p>
            <p>Price: {selectedPost.price}</p>
            <form>
                <label htmlFor="message">Send Message:</label>
                <input 
                type="text"
                placeholder='enter message here'
                required
                id="message"
                value={message}
                onChange={e => setMessage(e.target.value)
                }
                />
            </form>
        </>
    )
}

export default SinglePost
