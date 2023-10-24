import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./../firebase/config";
const AuthPage = ({ setIsAuth }) => {
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        localStorage.setItem("token", res.user.refreshToken);
        setIsAuth(true);
      })
      .catch((res) => console.log(res));
  };
  return (
    <div className="container">
      <div className="auth">
        <h1>Chat Room</h1>
        <p>Login to Start Chat</p>
        <button onClick={handleLogin}>
          <img src="/g-logo.png" alt="google-logo" />
          <span>Sign Up with Google</span>
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
