import React from 'react'

const Post = ({posts}) => {
    return (
        <main>
            {posts.map(post => (
                <article key={post._id}>
                    <h1>{post.title}</h1>
                    <p>{post.description}</p>
                </article>
            ))}
        </main>
    )
}

export default Post
