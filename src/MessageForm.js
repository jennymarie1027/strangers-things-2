import React, { useState } from 'react'



const MessageForm = ({message, setMessage}) => {
    return (
        <div>
            <h1>WELCOME TO THE MESSAGE FORM</h1>
            <form>
                <label htmlFor="message">Send Message:</label>
                <input 
                type="text"
                placeholder='enter message here'
                required
                id="message"
                value={message}
                onChange={e => setMessage(e.target.value)
                }
                />
            </form>
        </div>
    )
}

export default MessageForm
