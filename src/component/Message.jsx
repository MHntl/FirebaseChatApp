import React, { useEffect, useRef } from "react";
import { auth } from "../firebase/config";

const Message = ({ data }) => {
  const timestamp = data?.createdAt;
  const date = timestamp?.toDate();

  const hours = date?.getHours().toString().padStart(2, "0");
  const mins = date?.getMinutes().toString().padStart(2, "0");

  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Mesajlar güncellendiğinde aşağı kaydır
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  if (auth.currentUser.uid === data.author.uid) {
    return (
      <div className="msg-user">
        <p className="time">{`${hours}:${mins}`}</p>
        <p>{data.text}</p>
        <div ref={messagesEndRef} />
      </div>
    );
  }

  return (
    <div className="msg-other">
      <p className="user-info">
        <img src={data.author.photo} alt="" />
        <span>{data.author.name.slice(0, 8)}</span>
      </p>
      <p className="time">{`${hours}:${mins}`}</p>
      <div>
        <p className="msg-text">: {data.text}</p>
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Message;
