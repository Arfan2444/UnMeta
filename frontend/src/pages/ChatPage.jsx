import React from 'react'
import toast from 'react-hot-toast'

function ChatPage() {
  return (
    <div>ChatPage
      <button onClick={() => {toast.success("u clicked")}}>Click me</button>
    </div>
  )
}

export default ChatPage