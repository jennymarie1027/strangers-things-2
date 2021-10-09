import React, {useEffect, useState} from 'react'
import { handleFetchingUserInfo } from '../handleFuncs'


const Profile = ({ token, message, setMessage,  }) => {
  const [pastposts, setPastPosts] = useState([]);
  const [username, setUsername] = useState('User');
 

  useEffect(() => {
      async function getUserInfo() {
        if (token) {
          const data = await handleFetchingUserInfo(token);
          if (data.data) {
            console.log(data.data);
            setMessage(data.data.messages);
            setUsername(data.data.username)
            setPastPosts(data.data.posts)
          }
        }
      }
      getUserInfo();
  }, [token])

  return ( 
    <>
    {token ?
    <main className='marginTop profileContainer'>
      <h1>{username}'s Profile</h1>
      <h2 className='mt-5'>Your Inbox:</h2>
        <table className='table table-striped mb-3' style={{border: 1 + 'px solid black'}}>
          <thead>
            <tr>
              <th scope='col'>Message From:</th>
              <th scope='col'>Message Content:</th>
              <th scope='col'>Regarding Your Post Titled:</th>
            </tr>
          </thead>
          <tbody>
            {message
            ? (
              message.map((msg) => (
                // {msg.fromUser.username !== username ? : null}
                  <tr scope='row' key={msg._id}>
                  <td>{msg.fromUser.username !== username ? msg.fromUser.username : null}</td>
                  <td>{msg.fromUser.username !== username ? msg.content : null}</td>
                  <td>{msg.fromUser.username !== username ? msg.post.title : null}</td>
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
              <th scope='col'>Your Post Title:</th>
              <th scope='col'>Post Content:</th>
              <th scope='col'>Post Price:</th>
            </tr>
          </thead>
          <tbody>
            {pastposts
            ? (
              pastposts.map((post) => (
                <tr scope='row' key={post._id}>
                  <td>{post.title}</td>
                  <td>{post.description}</td>
                  <td>${post.price}</td>
                </tr>
              ))
            ) : <tr>
                  <td>No Posts to display</td>
                </tr>}
          </tbody>
        </table>
      </main>
      : <h2 style={{marginTop: 5 + 'em'}}>Loading...</h2>}
      </>
  )
}

export default Profile
