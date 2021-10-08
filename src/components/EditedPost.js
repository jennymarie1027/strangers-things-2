import React, { useEffect, useState } from 'react'
import { findPostById, handlePostEdit } from '../handleFuncs';

const EditedPost = ({token, posts, match, setSelectedPost, selectedPost}) => {

    useEffect(() => {
        const postID = match.params.postID
        if (posts){
            const foundPost = findPostById(postID, posts)
            console.log(foundPost);
            setSelectedPost(foundPost);
        }
    }, [])
    const {title} = selectedPost;
    const {description} = selectedPost;
    const {price} = selectedPost;
    const {location} = selectedPost;
    const {willDeliver} = selectedPost;
  
    const [editedTitle, setEditedTitle] = useState(title)
    const [editedDescription, setEditedDescription] = useState(description)
    const [editedPrice, setEditedPrice] = useState(price)
    const [editedLocation, setEditedLocation] = useState(location)
    const [editedDelivery, setEditedDelivery] = useState(willDeliver)

   async function edit(e) {
        e.preventDefault();
        const postID = match.params.postID
        const data = await handlePostEdit(postID, token, editedTitle, editedDescription, editedPrice, editedLocation, editedDelivery)
        console.log(data);
    }

    return (
        <div style={{marginTop: 7 + 'em'}}>
            <form onSubmit={async (e) => edit(e)}>
                <label>Post Title</label>
                <input 
                type='text'
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                />
                <label>Post Description</label>
                <input 
                type='text'
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                />
                 <label>Price</label>
                <input 
                type='text'
                value={editedPrice}
                onChange={(e) => setEditedPrice(e.target.value)}
                />
                 <label>Location</label>
                <input 
                type='text'
                value={editedLocation}
                onChange={(e) => setEditedLocation(e.target.value)}
                />
                <label htmlFor="deliver">Willing to Deliver</label>
                <input 
                    type="checkbox"
                    id="deliver"
                    value={editedDelivery}
                    onChange={() => setEditedDelivery(!willDeliver)}
                />
                <button>Submit Changes</button>
            </form>
        </div>
    )
}

export default EditedPost
