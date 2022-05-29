import React from 'react'
import Upload from './SVG/Upload'
import "./MessageForm.css"
const MessageForm = ({handleSubmit, text, setText, setImg}) => {
  return (
    <form className='message_form' onSubmit={handleSubmit}>
        <label htmlFor="img">
            <Upload/>
        </label>
        <input type="file" name="" id="img" accept='image/*' style={{display: 'none'}} onChange = {e=> setImg(e.target.files[0])} />
        <div>
            <input type="text" name="" id="" placeholder='Enter message' value={text} onChange = {e=>setText(e.target.value)}/>
        </div>
        <div>
            <button className='btn'>Send</button>
        </div>
    </form>
  )
}

export default MessageForm