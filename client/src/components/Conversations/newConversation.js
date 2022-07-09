import React, { useEffect, useState } from "react";

const URL = "http://192.168.1.102:5000/";

const NewConversations = (props) => {
  const [users, setUsers] = useState([]);

  const { conversations, setSelectedConversation, search } = props;

  const handleClick = (e) => {
    fetch(URL + "new_conversation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("token"),
        recipientId: e.target.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSelectedConversation({
          conversationId: data._id,
          username: e.target.innerText,
        });
      });
  };

  useEffect(() => {
    if (search) {
      async function getUsers() {
        const response = await fetch(URL + "get_users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: localStorage.getItem("token"),
            search: search,
          }),
        });
        const data = await response.json();

        if (data.length > 0) {
          if (
            conversations.some((conversation) =>
              conversation.recipients.some(
                (recipient) => recipient.username === search
              )
            )
          ) {
            setUsers([]);
          } else {
            setUsers(data);
          }
        } else {
          setUsers([]);
        }
      }
      getUsers();
    } else {
      setUsers([]);
    }
  }, [search, conversations]);

  return (
    <div>
      {search && (
        <p className="conversations-subtitle">Start a New Conversation</p>
      )}

      {search && users.length === 0 && (
        <p>
          User does not exist. <br></br> Make sure you correctly entered their
          full username
        </p>
      )}

      {users.map((user) => (
        <button
          id="conversation-button"
          key={user._id}
          value={user._id}
          onClick={handleClick}
        >
          {user.username}
        </button>
      ))}
    </div>
  );
};

export default NewConversations;
