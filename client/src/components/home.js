import React from "react";
import io from "socket.io-client";

import Conversations from "./Conversations/conversations";

const URL = "http://192.168.1.102:5000/";
const socket = io(URL);
socket.emit("user_connected", {
  userId: localStorage.getItem("token"),
});

const Home = () => {
  return (
    <div>
      <Conversations socket={socket} />
    </div>
  );
};

export default Home;
