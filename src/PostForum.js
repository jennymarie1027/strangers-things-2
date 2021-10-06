import React, { useEffect } from 'react'
import { handleDelete, handleFetchingPosts} from './handleFuncs';
import Search from './Search';
import './PostForum.css'

const PostForum = ({
    posts, token, setPosts, history, search, setSearch, isLoggedIn, 
}) => {
    
    const deletedPost = async (id) => {
        await handleDelete(id, token);
        const postsList = posts.filter(post => post.id !== id);
        console.log(postsList);
        setPosts([...postsList]);
        history.push('/postforum');
    }

    useEffect(() => {
        const getPosts = async () => {
            const data = await handleFetchingPosts();
            console.table(data.data.posts); //isAuthor is true
            setPosts(data.data.posts)
           console.table(posts); //isAuthor is false. How am I overwriting it????
        }
        getPosts();
    }, [posts])

    return (
        <main>
            <Search search={search} setSearch={setSearch} />
            {posts &&
            posts.map(post => (
                <article style={{marginTop: 5 + 'vh'}} key={post._id}>
                    {console.log(post.isAuthor)}
                    <h1>{post.title}</h1>
                    <p>{post.description}</p>
                    <p>{post.price}</p>
                   
                        <>
                        {post.isAuthor ? 
                        <button onClick={async () => {
                            deletedPost(post._id);
                            const data = await handleFetchingPosts();
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