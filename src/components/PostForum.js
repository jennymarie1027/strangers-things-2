import React, { useEffect } from 'react'
import { handleDelete, handleFetchingPosts} from '../handleFuncs';
import Search from './Search';
import '../stylingsheets/app.css'
import '../stylingsheets/postforum.css'

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
        await handleFetchingPosts(token);
    }   
    getPosts(); 
  }, [posts])


    return (
        <main className='postForumContainer'>
            <Search search={search} setSearch={setSearch} />
            {posts &&
            posts.map(post => (
                <article className='postForumArticle' key={post._id}>
                    <h3>{post.title}</h3>
                    <ul className="postContainer">
                        <li><span className='title'>Description:</span> {post.description}</li>
                        <div className='postDetails'>
                        <li><span className='title'>Price:</span> {post.price}</li>
                        <li><span className='title'>Location:</span> {post.location}</li>
                        <li><span className='title'>Delivery?</span>{post.willDeliver ? ' Yes' : ' No'}</li>
                    </div>
                    </ul>
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