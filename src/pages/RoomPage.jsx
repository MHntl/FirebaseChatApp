import React from "react";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

const RoomPage = ({ setIsAuth, setRoom }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const roomName = e.target[0].value.toLowerCase();
    setRoom(roomName);
  };
  const handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("token");
      setIsAuth(false);
    });
  };
  return (
    <form onSubmit={handleSubmit} className="room-page">
      <h1>Chat Room</h1>
      <p>Which room will you join? </p>
      <input type="text" placeholder="Ex:testServer" />
      <button type="submit"> Enter Room</button>
      <button onClick={() => handleLogout()}>Log Out</button>
    </form>
  );
};

export default RoomPage;
