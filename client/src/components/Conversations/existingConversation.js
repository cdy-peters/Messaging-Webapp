import React, { useEffect, useState } from "react";

const ExistingConversations = (props) => {
  const [conversations, setConversations] = useState([]);
  const [filteredConversations, setFilteredConversations] = useState([]);
  const { setSelectedConversation, search } = props;

  const handleClick = (e) => {
    setSelectedConversation({
      conversationId: e.target.value,
      username: e.target.innerText,
    });
  };

  useEffect(() => {
    async function getConversations() {
      const response = await fetch("http://localhost:5000/get_conversations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: localStorage.getItem("token"),
        }),
      });
      const data = await response.json();

      setConversations(data);
    }
    getConversations();
  }, []);

  // On search change, hide buttons where search is not in the username
  useEffect(() => {
    if (search) {
      // eslint-disable-next-line array-callback-return
      const filtered = conversations.filter((conversation) => {
        if (
          conversation.recipients.some((recipient) =>
            recipient.username.includes(search)
          )
        ) {
          return conversation;
        }
      });
      setFilteredConversations(filtered);
    } else {
      setFilteredConversations(conversations);
    }
  }, [search, conversations]);

  return (
    <div>
      <h1>Conversations</h1>

      {filteredConversations.map((conversation) => (
        <button
          key={conversation._id}
          value={conversation._id}
          onClick={handleClick}
        >
          {conversation.recipients[0].username}
        </button>
      ))}
    </div>
  );
};

export default ExistingConversations;
