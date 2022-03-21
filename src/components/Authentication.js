import React, { useState } from "react";
import { TextField, Button, Alert, Snackbar } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "../styles/Authentication.css";
import { app } from "../services/config";

function Authentication() {
  const [menu, setMenu] = useState(0);
  const { register, handleSubmit } = useForm();
  const auth = getAuth(app);
  const onSubmit = (data) => {
    if (menu === 0) login(data);
    else signup(data);
  };

  const login = (data) => {
    console.log("login");
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  const signup = (data) => {
    console.log("signup");
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ..
      });
  };

  return (
    <main className="authentication__container">
      <h1>{menu === 0 ? "Login" : "Sign up"}</h1>

      <form className="authentication__form" onSubmit={handleSubmit(onSubmit)}>
        <TextField label="Email" type="text" required {...register("email")} />
        <TextField
          label="Password"
          type="password"
          required
          {...register("password")}
        />
        {menu === 1 && (
          <TextField label="Confirm Password" type="password" required />
        )}
        <Button type="submit" variant="contained">
          {menu === 0 ? "Login" : "Sign up"}
        </Button>
      </form>

      {menu === 0 && (
        <div className="authentication__question">
          <h6>
            Not a member?<span onClick={() => setMenu(1)}>Sign up</span>
          </h6>
        </div>
      )}

      {menu === 1 && (
        <div className="authentication__question">
          <h6>
            Already have an account?
            <span onClick={() => setMenu(0)}>Log in</span>
          </h6>
        </div>
      )}
    </main>
  );
}

export default Authentication;
