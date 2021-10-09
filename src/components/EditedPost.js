import React, { useEffect, useState } from 'react'
import { findPostById, handlePostEdit, handleFetchingPosts } from '../handleFuncs';


const EditedPost = ({token, setSearchResults, setPosts, posts, match, history, setSelectedPost, selectedPost}) => {

    useEffect(() => {
        console.log('inside useEffect');
        const postID = match.params.postID
        const foundPost = findPostById(postID, posts)
        if (foundPost) {
            setSelectedPost(foundPost);
            console.log('foundPost inside editedPost component', foundPost);
        }
    }, [posts])
    
  
    const {title, description, price, location, willDeliver} = selectedPost;
  
    const [editedTitle, setEditedTitle] = useState(title)
    const [editedDescription, setEditedDescription] = useState(description)
    const [editedPrice, setEditedPrice] = useState(price)
    const [editedLocation, setEditedLocation] = useState(location)
    const [editedDelivery, setEditedDelivery] = useState(willDeliver)

    useEffect(() => {
       setEditedTitle(selectedPost.title)
       setEditedDescription(selectedPost.description)
       setEditedPrice(selectedPost.price)
       setEditedLocation(selectedPost.location)
       setEditedDelivery(selectedPost.willDeliver);
    }, [selectedPost])
    

   async function edit(e) {
        e.preventDefault();
        const postID = match.params.postID
        await handlePostEdit(postID, token, editedTitle, editedDescription, editedPrice, editedLocation, editedDelivery)
        const data = await handleFetchingPosts(token);
        setPosts(data.data.posts);
        setSearchResults(data.data.posts)
        history.push('/postforum');
    }

    return (
        <div className='marginTop editedPostContainer'>
            <form onSubmit={async (e) => edit(e)}>
                <div className='editedPostFormContainer'>
                <h1 className='heading'>Edit Post Here</h1>
                <div className='editedPostContainerDetails'>
                    <label>Post Title: </label>
                    <input 
                    type='text'
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    />
                </div>
                <div className='editedPostContainerDetails'>
                    <label>Post Description: </label>
                    <input 
                    type='text'
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    />
                </div>
                <div className='editedPostContainerDetails'>
                    <label>Price:</label>
                    <input 
                    type='text'
                    value={editedPrice}
                    onChange={(e) => setEditedPrice(e.target.value)}
                    />
                </div>
                <div className='editedPostContainerDetails'>
                    <label>Location: </label>
                    <input 
                    type='text'
                    value={editedLocation}
                    onChange={(e) => setEditedLocation(e.target.value)}
                    />
                </div>
                <div className='editedPostContainerDetails'>
                    <label htmlFor="deliver">Willing to Deliver?</label>
                    <input 
                        type="checkbox"
                        id="deliver"
                        value={editedDelivery}
                        onChange={() => setEditedDelivery(!willDeliver)}
                    />
                </div>
                <button className='editPostBtn btn btn-lg btn-block mt-4'>Submit Changes</button>
                </div>
            </form>
        </div>
    )
}

export default EditedPost
