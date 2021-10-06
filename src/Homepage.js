import React, {useEffect, useState} from 'react'
import { handleFetchingUserInfo } from './handleFuncs'


const Homepage = ({ message, setMessage, isLoggedIn, history }) => {
  const [pastposts, setPastPosts] = useState([]);
  const [username, setUsername] = useState('');
 

  // useEffect(() => {
  //     async function getUserInfo() {
  //       const data = await handleFetchingUserInfo();
  //       setMessage(data.data.messages);
  //       setUsername(data.data.username)
  //       setPastPosts(data.data.posts)
  //       console.log(message);

  //     }
  //     getUserInfo();
  // }, [])

  return ( 
    <>
    {isLoggedIn ?
    <main style={{marginTop: 5 + 'em'}}>
      <h1>{username}'s Profile</h1>
      <h2 className='mt-5'>Your Inbox:</h2>
        <table className='table table-striped mb-3' style={{border: 1 + 'px solid black'}}>
          <thead>
            <tr>
              <th scope='col'>Message From:</th>
              <th scope='col'>Message Content:</th>
              <th scope='col'>Regarding Post:</th>
            </tr>
          </thead>
          <tbody>
            {message
            ? (
              message.map((msg) => (
                  <tr scope='row' key={msg._id}>
                  <td>{msg.fromUser.username}</td>
                  <td>{msg.content}</td>
                  <td>{msg.post.title}</td>
                  </tr>
              ))
            ) : <tr>
                  <td>No messages to display</td>
                </tr>}
          </tbody>
        </table>
        <h2 style={{marginTop: 3 + 'em'}}>Your Past Posts:</h2>
        <table className='table table-striped' style={{border: 1 + 'px solid black'}}>
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
      : history.push('./login')}
      </>
  )
}

export default Homepage
