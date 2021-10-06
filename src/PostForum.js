import React, { useEffect } from 'react'
import { handleDelete, handleFetchingPosts} from './handleFuncs';
import Popup from './Popup';
import Search from './Search';
import MessageForm from './MessageForm';
import { findPostById } from './handleFuncs';
import './PostForum.css'

const PostForum = ({
    posts, token, setPosts, history, setButtonPopUp, buttonPopUp, search, setSearch, isLoggedIn, setSelectedPost
}) => {
    
    const deletedPost = async (id) => {
        await handleDelete(id, token);
        const postsList = posts.filter(post => post.id !== id);
        console.log(postsList);
        setPosts([...postsList]);
        history.push('/postforum');
    }


    // useEffect(() => {
    //     const getPosts = async () => {
    //         const data = await handleFetchingPosts();
    //         console.table(data.data.posts); //isAuthor is true
    //         setPosts(data.data.posts)
    //        console.table(posts); //isAuthor is false. How am I overwriting it????
    //     }
    //     getPosts();
    // }, [posts])

    return (
        <main>
            <Search search={search} setSearch={setSearch} />
            {posts &&
            posts.map(post => (
                <article style={{marginTop: 5 + 'vh'}} key={post._id}>
                    {/* {console.log(post.isAuthor)} */}
                    <h1>{post.title}</h1>
                    <p>{post.description}</p>
                    <p>{post.price}</p>
                    {isLoggedIn &&
                        <>
                        {/* {post.isAuthor &&  */}
                        <button onClick={async () => {
                            deletedPost(post._id);
                            const data = await handleFetchingPosts();
                            setPosts(data.data.posts);
                        }}
                        className='btn btn-lg btn-primary btn-block m-4'
                        >Delete</button>
                        {/* } */}
                        {/* {!post.isAuthor && */}
                        <button onClick={() => {
                            
                            history.push('/postforum/' + post._id)

                        }} 
                        className='btn btn-lg btn-primary btn-block m-4'
                        > 
                        Send Message
                        </button>
                        {/* } */}
                            
                        </>
                     } 
                    
                </article>
            ))}
        </main>
    )
}

export default PostForum

{/* <button onClick={() => setButtonPopUp(true) }> */}
// {buttonPopUp ? <Popup trigger={buttonPopUp} setButtonPopUp={setButtonPopUp} id={post._id} token={token}/> : null}