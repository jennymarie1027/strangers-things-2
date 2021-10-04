import React, { useState } from 'react'
import { handleSubmitMessage } from './handleFuncs';
import './popup.css'

const Popup = ({ trigger, setButtonPopUp, id, token }) => {

    const [content, setContent] = useState('');



    return trigger && (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={() => setButtonPopUp(!trigger)}>close</button>
                
                <form>
                    <label htmlFor="message">Send Message:</label>
                    <input 
                    type="text"
                    placeholder='enter message here'
                    required
                    id="content"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    />
                    <button onClick={() => handleSubmitMessage(token, id, content)}>Send Message</button>
                </form>
            </div>
        </div>
        
    )
}

export default Popup
