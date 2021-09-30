import React from 'react'

const Post = ({posts, handleDelete}) => {
    return (
        <main>
            {posts.map(post => (
                <article key={post._id}>
                    <h1>{post.title}</h1>
                    <p>{post.description}</p>
                    <button onClick={() => handleDelete(post._id)}>Delete</button>
                </article>
            ))}
        </main>
    )
}

export default Post
