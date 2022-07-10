import React, { useEffect } from "react";
import moment from "moment";

const URL = "http://192.168.1.102:5000/";

const MessageHistory = (props) => {
  const {
    messages,
    setMessages,
    conversationId,
  } = props;

  useEffect(() => {
    async function getMessages() {
      const response = await fetch(URL + "get_messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversationId: conversationId,
        }),
      });
      const data = await response.json();

      setMessages(data);
    }
    getMessages();
  }, [conversationId]);

  var prevTime;

  const renderMessage = (message) => {
    const time = moment(message.date).fromNow();

    if (!prevTime || prevTime !== time) {
      prevTime = time;
      if (message.sender === localStorage.getItem("username")) {
        return (
          <div key={message._id} className="message-sent">
            <p className="messages-time">
              <span>{time}</span>
            </p>
            <p className="messages-message">{message.message}</p>
          </div>
        );
      } else {
        return (
          <div key={message._id} className="message-received">
            <p className="messages-time">
              <span>{time}</span>
            </p>
            <p className="messages-message">{message.message}</p>
          </div>
        );
      }
    } else {
      if (message.sender === localStorage.getItem("username")) {
        return (
          <div key={message._id} className="message-sent">
            <p className="messages-message">{message.message}</p>
          </div>
        );
      } else {
        return (
          <div key={message._id} className="message-received">
            <p className="messages-message">{message.message}</p>
          </div>
        );
      }
    }
  };

  return <div>{messages.map((message) => renderMessage(message))}</div>;
};

export default MessageHistory;
