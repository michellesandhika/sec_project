
import './App.css';

import auth from './firebaseconf';
import {signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

function App() {

  const GoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider)
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log(credential)
    } catch (e) {
      console.log(e.code, e.message)
    }
  }
  return ( 
    <>
    <button onClick={GoogleLogin}>
      Hello wdorld
    </button>
    </>);
}

export default App;
