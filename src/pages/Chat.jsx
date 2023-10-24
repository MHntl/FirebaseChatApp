import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useEffect, useState } from "react";
import Message from "../component/Message";

const Chat = ({ room, setRoom }) => {
  const messagesRef = collection(db, "messages");
  const [messages, setMassages] = useState(null);
  //----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target[0].value;
    await addDoc(messagesRef, {
      text: text,
      room: room,
      createdAt: serverTimestamp(),
      author: {
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
        uid: auth.currentUser.uid,
      },
    });
    e.target[0].value = "";
  };
  //---------

  useEffect(() => {
    //Filter
    const options = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );
    //Get Update Data
    const unsubscribe = onSnapshot(options, (snapshot) => {
      const tempData = [];
      snapshot.docs.forEach((doc) => tempData.push(doc.data()));
      setMassages(tempData);
    });
    //sayfadan çıktıkdan sonra onSnapshot ın sayfayı izlemesini durduruyoruz
    //didUnmount
    return () => unsubscribe();
  }, []);
  return (
    <div className="chat">
      <header>
        <p>{auth?.currentUser?.displayName}</p>
        <p>{room}</p>
        <button onClick={() => setRoom(null)}>Change Room</button>
      </header>
      <main>
        {messages?.map((data, i) => (
          <Message key={i} data={data} />
        ))}
      </main>
      <form onSubmit={handleSubmit}>
        <input type="text" required placeholder="Type your message..." />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
