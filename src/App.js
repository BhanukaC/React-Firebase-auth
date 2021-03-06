import { useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
import './App.css';
import { auth } from './firebase-config';

function App() {

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  })

  async function register() {
    try {
      const user = await createUserWithEmailAndPassword(auth,registerEmail,registerPassword);
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
    
  }

  async function login() {
    try {
      const user = await signInWithEmailAndPassword(auth,loginEmail, loginPassword);
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }

  }

  async function logout() {
    await signOut(auth);
  }




  return (
    <div className="App">
      <div>
        <h3>Register User</h3>
        <input placeholder='Email..' onChange={(event) => {
          setRegisterEmail(event.target.value);
        }}/>
        <input placeholder='Password..' onChange={(event) => {
          setRegisterPassword(event.target.value);
        }}/>

        <button onClick={register}>Create User</button>
     </div>

       <div>
        <h3>Login</h3>
        <input placeholder='Email..' onChange={(event) => {
          setLoginEmail(event.target.value);
        }}/>
        <input placeholder='Password..' onChange={(event) => {
          setLoginPassword(event.target.value);
        }}/>

        <button onClick={login}>Login</button>
     </div>


      <h4>User Logged in : </h4>
      {user?.email}
 
      <button onClick={logout}>Sign out</button>
     
    </div>
  );
}

export default App;
