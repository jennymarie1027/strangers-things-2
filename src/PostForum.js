import React, { useEffect } from 'react'
import { handleDelete, handleFetchingPosts} from './handleFuncs';
import Search from './Search';
import './PostForum.css'

const PostForum = ({
    posts, token, setPosts, history, search, setSearch, isLoggedIn, 
}) => {
    
    const deletedPost = async (token, id) => {
        const res = await handleDelete(token, id);
        console.log(res);
        const postsList = posts.filter(post => post.id !== id);
        setPosts([...postsList]);
        history.push('/postforum');
    }

    return (
        <main>
            <Search search={search} setSearch={setSearch} />
            {posts &&
            posts.map(post => (
                <article style={{marginTop: 5 + 'vh'}} key={post._id}>
                    <h1>{post.title}</h1>
                    <p>{post.description}</p>
                    <p>{post.price}</p>
                    <>
                        {post.isAuthor ? 
                            <button onClick={async () => {
                                deletedPost(token, post._id);
                                const data = await handleFetchingPosts(token);
                                setPosts(data.data.posts);
                            }}
                            className='btn btn-lg btn-primary btn-block m-4'
                            >Delete</button>
                        
                        :
                            <button onClick={() => {
                                {isLoggedIn 
                                    ? history.push('/postforum/' + post._id)
                                    : history.push('/register')
                                }
                            }} 
                            className='btn btn-lg btn-primary btn-block m-4'
                            > 
                            Send Message
                            </button>
                        }
                            
                     </>
                      
                    
                </article>
            ))}
        </main>
    )
}

export default PostForum

{/* <button onClick={() => setButtonPopUp(true) }> */}
// {buttonPopUp ? <Popup trigger={buttonPopUp} setButtonPopUp={setButtonPopUp} id={post._id} token={token}/> : null}