import React, { useEffect } from 'react'
import { findPostById, handleSubmitMessage } from '../handleFuncs';
import '../stylingsheets/app.css'
import '../stylingsheets/singlepost.css'

const SinglePost = ({ selectedPost, setSelectedPost, match, history, posts, message, setMessage }) => {
    
    useEffect(() => {
        const postID = match.params.postID
        if (posts){
            const foundPost = findPostById(postID, posts)
            setSelectedPost(foundPost);
        }
    }, [posts])

    return (
        <main className='singlePostContainer'>
            <h1 className='marginTop'>{selectedPost.title}</h1>
            <p>Description: {selectedPost.description}</p>
            <p>Price: {selectedPost.price}</p>
            <form className='singlePostForm' 
                onSubmit={(e => {
                e.preventDefault()
                const postID = match.params.postID;
                const token = localStorage.getItem('token');
                handleSubmitMessage(token, postID, message);
                setMessage('');
                history.push('/postforum')
            })}>
                <textarea 
                type="text"
                placeholder='enter message here...'
                autoFocus
                required
                id="message"
                value={message}
                onChange={e => setMessage(e.target.value)
                }
                />
            <button className='btn btn-lg btn-primary btn-block mt-4' >Send Message</button>
            </form>
        </main>
    )
}

export default SinglePost
