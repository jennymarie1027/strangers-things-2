import React, {useEffect, useState} from 'react'
import { handleFetchingUserInfo } from './handleFuncs'


const Homepage = ({ token }) => {
  const [pastposts, setPastPosts] = useState([]);
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState('');

  useEffect(() => {
      async function getUserInfo() {
        const data = await handleFetchingUserInfo();
        console.log(data);
        setMessages(data.data.messages);
        setUsername(data.data.username)
        setPastPosts(data.data.posts)
      }
      getUserInfo();
  }, [])

  return ( 
    <main>
      <h1>{username}'s Profile</h1>
      <h2 className='mb-5'>Your Inbox:</h2>
        <table className='table table-striped mb-3'>
          <thead>
            <tr>
              <th scope='col'>Post:</th>
              <th scope='col'>From:</th>
              <th scope='col'>Message:</th>
            </tr>
          </thead>
          <tbody>
            {messages
            ? (
              messages.map((msg) => (
                  <tr scope='row' key={msg._id}>
                  <td>{msg.post.title}</td>
                  <td>{msg.fromUser.username}</td>
                  <td>{msg.content}</td>
                  </tr>
              ))
            ) : <tr>
                  <td>No messages to display</td>
                </tr>}
          </tbody>
        </table>
        <h2>Your Past Posts:</h2>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th scope='col'>Post Title:</th>
              <th scope='col'>Post Content:</th>
              <th scope='col'>Price:</th>
            </tr>
          </thead>
          <tbody>
            {pastposts
            ? (
              pastposts.map((post) => (
                <tr scope='row' key={post._id}>
                  <td>{post.title}</td>
                  <td>{post.description}</td>
                  <td>{post.price}</td>
                </tr>
              ))
            ) : <tr>
                  <td>No Posts to display</td>
                </tr>}
          </tbody>
        </table>
      </main>
  )
}

export default Homepage


{/* <ul>
        {messages
        ? (
          messages.map((msg) => <li key={msg._id}>From: {msg.fromUser.username} on post: {msg.post.title} Content: {msg.content}</li>)
        ) : <h2>No messages to be displayed</h2>}
        </ul>
        <h2>Your Past Post's</h2>
        <ul>
        {pastposts
          ? (
          pastposts.map((post) => <li key={post._id}>Post title: {post.title} Description: {post.description} Price: {post.price}</li>)
          ) : <h2>You haven't posted anything yet</h2>}
        </ul> */}