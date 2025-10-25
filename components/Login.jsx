"use client";

import { useAuth } from "@/context/AuthContext";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const params = useSearchParams();
  const isReg = params.get("register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistration, setIsRegistration] = useState(isReg);
  const [error, setError] = useState(null);
  const [authenticating, setAuthenticating] = useState(false);

  const { signup, login } = useAuth();

  async function handleAuthenticate() {
    if (
      !email ||
      !email.includes("@") ||
      password.length < 6 ||
      authenticating
    ) {
      setError("Please provide valid email & password (min 6 chars).");
      return;
    }

    setError(null);
    setAuthenticating(true);
    try {
      if (isRegistration) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
    } catch (err) {
      setError(err.message || "Authentication failed.");
    } finally {
      setAuthenticating(false);
    }
  }

  return (
    <div className="login">
      <h2>{isRegistration ? "Create an Account  " : "Login"}</h2>
      {error && (
        <div className="card">
          <p>❌ {error}</p>
        </div>
      )}
      <input
        className="login-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
      />
      <input
        className="login-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <button
        className="login-btns"
        onClick={handleAuthenticate}
        disabled={authenticating}
      >
        {authenticating ? "Submitting..." : "Submit"}
      </button>
      <div className="full-line" />
      <div>
        <p>
          {isRegistration
            ? "Already Have an Account"
            : "Don't Have an Account ?"}
        </p>
        <button
          className="login-btns"
          onClick={() => {
            setIsRegistration(!isRegistration);
          }}
        >
          {isRegistration ? "Login" : "Sign Up"}
        </button>
      </div>
    </div>
  );
}
