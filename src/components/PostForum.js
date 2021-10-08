import React, { useEffect } from 'react'
import { handleDelete, handleFetchingPosts} from '../handleFuncs';
import Search from './Search';
import '../stylingsheets/PostForum.css'

const PostForum = ({
    posts, token, setPosts, history, search, setSearch, isLoggedIn, setSearchResults
}) => {
    
    const deletedPost = async (token, id) => {
        const res = await handleDelete(token, id);
        console.log(res);
        const postsList = posts.filter(post => post.id !== id);
        setPosts([...postsList]);
        const data = await handleFetchingPosts(token);
        setSearchResults(data.data.posts);
        history.push('/postforum');
    }

     // this useEffect initiates an AJAX call whenever the token changes
  useEffect(() => {
    async function getPosts() {
      const data = await handleFetchingPosts(token);
    }   
    getPosts(); 
  }, [posts])


    return (
        <main>
            <Search search={search} setSearch={setSearch} />
            {posts &&
            posts.map(post => (
                <article style={{marginTop: 5 + 'vh'}} key={post._id}>
                    <h1>{post.title}</h1>
                    <p>Description: {post.description}</p>
                    <p>Price: {post.price}</p>
                    <p>Location: {post.location}</p>
                    {post.willDeliver ? <p>Delivery Available</p> : <p>No Delivery Option</p>}
                    <>
                        {post.isAuthor ? 
                            <button onClick={() => deletedPost(token, post._id)}
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
                            > Send Message</button>
                        }    
                     </>
                </article>
            ))}
        </main>
    )
}

export default PostForum