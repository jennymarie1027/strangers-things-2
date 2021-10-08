import React, { useState, useEffect } from 'react'
import { handleFetchingPosts, handleNewPostSubmit } from '../handleFuncs';
import '../stylingsheets/app.css'
import '../stylingsheets/newpost.css'

const NewPost = ({ setPosts, token, history, posts, setSearchResults, searchResults}) => {

    const [newPostTitle, setNewPostTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [location, setLocation] = useState('');
    const [newPostBody, setNewPostBody] = useState('');
    const [deliver, setDeliver] = useState(false);

    useEffect(() => {
        setPosts(posts);
    }, [searchResults])

    return (
        <article className='marginTop newPostContainer'>
            <h2 className='primaryColor'>New Post</h2>
            <form onSubmit={async (e) => {
                e.preventDefault();
                await handleNewPostSubmit(token, newPostTitle, newPostBody, price, deliver)
                const data = await handleFetchingPosts(token);
                setPosts(data.data.posts);
                setSearchResults(data.data.posts)
                setNewPostBody('')
                setNewPostTitle('')
                setPrice(0)
                setDeliver(false)
                history.push('/postforum');
                }}
                >
                <label htmlFor="postTitle">Post Title:</label>
                <input 
                    id='postTitle'
                    required
                    placeholder="post title"
                    type='text'
                    value={newPostTitle}
                    onChange={e => setNewPostTitle(e.target.value)}
                    className='form-control mb-2'
                />
                <label htmlFor="price">Price:</label>
                <input 
                    id='price'
                    type='text'
                    placeholder="enter price"
                    required
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    className='form-control mb-2'
                />
                <label htmlFor="location">Location:</label>
                <input 
                    id='location'
                    type='text'
                    placeholder="enter location"
                    required
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className='form-control mb-2'
                />
                <label htmlFor="newPostBody">Description:</label>
                <textarea 
                    id="newPostBody"
                    required
                    type='text'
                    placeholder="describe the item you are selling"
                    value={newPostBody}
                    onChange={e => setNewPostBody(e.target.value)}
                    className='form-control mb-2'
                />
                <div>
                <label htmlFor="deliver">Willing to Deliver</label>
                <input 
                    type="checkbox"
                    id="deliver"
                    value={deliver}
                    onChange={() => setDeliver(!deliver)}
                />
                </div>
                
                <button className='btn btn-lg btn-primary btn-block mt-4'>Submit!</button>
            </form>
            
        </article>
    )
}

export default NewPost
