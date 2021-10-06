import React, { useState } from 'react'
import { handleFetchingPosts, handleNewPostSubmit } from './handleFuncs';

const NewPost = ({ setPosts, token, history, posts}) => {

    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostBody, setNewPostBody] = useState('');
    const [price, setPrice] = useState(0);
    const [deliver, setDeliver] = useState(false);

    return (
        <article style={{marginTop: 20 + 'vh'}}>
            <h2 style={{textAlign: 'center', color: '#0275d8'}}>New Post</h2>
            <form onSubmit={async (e) => {
                const data = await handleNewPostSubmit(e, token, newPostTitle, newPostBody, price, deliver)
                setPosts([...posts, data.data.post]);
                await handleFetchingPosts(token);
                setNewPostBody('')
                setNewPostTitle('')
                setPrice(0)
                setDeliver(false)
                history.push('/postforum');
                }}
                style={{maxWidth: 50 + 'vw', margin: 'auto'}}
                >
                <label htmlFor="postTitle">Post Title:</label>
                <input 
                    id='postTitle'
                    required
                    placeholder="post title"
                    value={newPostTitle}
                    onChange={e => setNewPostTitle(e.target.value)}
                    className='form-control mb-2'
                />
                <label htmlFor="price">Price:</label>
                <input 
                    id='price'
                    type='number'
                    placeholder="enter price"
                    required
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    className='form-control mb-2'
                />
                <label htmlFor="newPostBody">Description:</label>
                <textarea 
                    id="newPostBody"
                    required
                    placeholder="describe the item you are selling"
                    value={newPostBody}
                    onChange={e => setNewPostBody(e.target.value)}
                    className='form-control mb-2'
                    style={{height: 20 + 'vh'}}
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
                <button className='btn btn-lg btn-primary btn-block mt-4' style={{width: 100 + '%'}}>Submit!</button>
            </form>
            
        </article>
    )
}

export default NewPost
