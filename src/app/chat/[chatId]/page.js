"use client"
import { useState, useEffect } from 'react';
import { generateChatId, sendMessage, receiveMessages } from '@/utils/utils';
import { useUserStore } from '@/store/store';

export default function Chat({params}) {
  const [messages, setMessages] = useState({});
  const {UserId} = useUserStore();
  const [text, setText] = useState('');

  const {chatId} = params;


  const userId1 = chatId.split('_')[0];
  const userId2 = chatId.split('_')[1];
  useEffect(() => {
    console.log("Setting up listener for chatId:", chatId);

    // Function to handle new messages
    const handleMessages = (newMessages) => {
      console.log("Received messages:", newMessages);
      if (newMessages) {
        const messagesArray = Object.values(newMessages);
        setMessages(messagesArray);
      } else {
        setMessages([]);
      }
    };

    // Start listening for messages
    const unsubscribe = receiveMessages(chatId, handleMessages);

    // Cleanup function to stop listening when component unmounts or chatId changes
    return () => {
      console.log("Cleaning up listener for chatId:", chatId);
      if (unsubscribe) {
        unsubscribe(); // Ensure you unsubscribe to avoid memory leaks
      }
    };
  }, [chatId]);

  const handleSendMessage = () => {
    const receiver = UserId === userId1 ? userId2 : userId1;
    sendMessage(chatId, UserId, receiver, text);
    // sendMessage(chatId, userId1, userId2, text);
    setText('');
    console.log(messages)
  };

  return (
    <div>
      <div id="chat-window">
        {/* User one: {userId1}
        User two: {userId2}
        chatId: {chatId} */}
       {Object.keys(messages).map((messageId) => {
          const message = messages[messageId];
          console.log(message);
          console.log(UserId)
          return (
            <div key={messageId}>
              <strong>
                {UserId === message.sender ?(
                  <div className="chat chat-end">
                  <div className="chat-bubble chat-bubble-primary">
                  {message.text}
                  </div>
                </div>
                ): (
                  <div className="chat chat-start">
                  <div className="chat-bubble">
                  {message.text}
                  </div>
                </div>
                )}
              </strong>{" "}
            
            </div>
          );
        })}
      </div>

      <div className='flex justify-center items-center my-10'>
      <input
        type="text"
        className="input input-primary w-full max-w-xs" 
        value={text}
        onChange={(e) => setText(e.target.value)}
        />
      <button className='btn btn-primary mx-5' onClick={handleSendMessage}>Send</button>
        </div>
      {/* <button onClick={()=>{
        receiveMessages(chatId, (messages) => {
          setMessages(messages);
        });
        console.log(messages);
      }}>messages</button> */}
    </div>
  );
}
