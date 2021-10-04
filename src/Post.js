import React from 'react'
import MessageForm from './MessageForm'

const Post = ({posts, handleDelete, handleInitializingMessage, message, setMessage, isMessageDisplayed, setIsMessageDisplayed}) => {
    return (
        <main>
            {posts.map(post => (
                <article key={post._id}>
                    <h1>{post.title}</h1>
                    <p>{post.description}</p>
                    {/* {post.isAuthor 
                    ? <button onClick={() => handleDelete(post._id)}>Delete</button>
                    : <button onClick={() => handleInitializingMessage(post._id) }>
                        Send Message
                    </button>} */}
                </article>
            ))}
            {isMessageDisplayed ? <MessageForm /> : null}
        </main>
    )
}

export default Post
