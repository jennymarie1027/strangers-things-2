import React, { useState } from 'react'

const NewPost = ({ posts, setPosts, API_URL, token}) => {
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostBody, setNewPostBody] = useState('');
    const [price, setPrice] = useState(0);
    const [deliver, setDeliver] = useState(false);

    const handleNewPostSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    post: {
                        title: newPostTitle,
                        description: newPostBody,
                        price: price,
                        willDeliver: deliver
                    }
                })
            })
            const data = await res.json();
            setPosts([data.data.post]);
            
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <article>
            <h2>New Post</h2>
            <form onSubmit={handleNewPostSubmit}>
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
