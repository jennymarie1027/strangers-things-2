import React, { useState } from 'react'
import { handleNewPosts, handleNewPostSubmit } from './handleFuncs';

const NewPost = ({ setPosts, token, history}) => {

    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostBody, setNewPostBody] = useState('');
    const [price, setPrice] = useState(0);
    const [deliver, setDeliver] = useState(false);

    return (
        <article>
            <h2>New Post</h2>
            <form onSubmit={async (e) => {
                const data = await handleNewPostSubmit(e, token, newPostTitle, newPostBody, price, deliver)
                console.log(data);
                setPosts(data.data.post);
                handleNewPosts(token, setPosts);
                setNewPostBody('')
                setNewPostTitle('')
                setPrice(0)
                setDeliver(false)
                // history.push('/postforum');
                }}>
                <label htmlFor="postTitle">Title:</label>
                <input 
                    id='postTitle'
                    required
                    placeholder="post title"
                    value={newPostTitle}
                    onChange={e => setNewPostTitle(e.target.value)}
                />
                <label htmlFor="price">Price:</label>
                <input 
                    id="price"
                    placeholder="enter price"
                    required
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
                <label htmlFor="newPostBody">Post:</label>
                <textarea 
                    id="newPostBody"
                    required
                    placeholder="describe the item you are selling"
                    value={newPostBody}
                    onChange={e => setNewPostBody(e.target.value)}

                />
                <label htmlFor="deliver">Willing to Deliver</label>
                <input 
                    type="checkbox"
                    id="deliver"
                    value={deliver}
                    onChange={() => setDeliver(!deliver)}
                />
                <button>Submit!</button>
            </form>
            
        </article>
    )
}

export default NewPost
