import React, { useEffect } from 'react'
import { handleDelete, handleNewPosts } from './handleFuncs';

const PostForum = ({posts, handleInitializingMessage, token, setPosts, history}) => {
 
    const deletedPost = (id) => {
        handleDelete(id, token);
        const postsList = posts.filter(post => post.id !== id);
        setPosts(postsList);
        history.push('/postforum');
    }

    useEffect(() => {
        const getPosts = async () => {
            const myToken = window.localStorage.getItem('token')
            const data = await handleNewPosts(myToken);
            setPosts(data.data.posts)
        }
        getPosts();
    }, [])

    return (
        <main>
            {posts.map(post => (
                <article key={post._id}>
                    <h1>{post.title}</h1>
                    <p>{post.description}</p>
                    <p>{post.price}</p>
                    {post.isAuthor 
                        ? <button onClick={async () => {
                            deletedPost(post._id);
                            // const data = await handleNewPosts();
                            // setPosts(data.data.posts);
                        }}>Delete</button>
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
