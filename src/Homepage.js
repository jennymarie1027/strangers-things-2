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
    <>
    <main>
      <h1>Welcome to Stranger's Things {username}</h1>
      <h2>Your Inbox</h2>
        <ul>
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
        </ul>
      </main>
    </>
  )
}

export default Homepage
