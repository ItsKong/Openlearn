"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login(){
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const router = useRouter()
    const handleSubmit = (e) => {
        e.preventDefault();
        // handle login logic here
        const data = JSON.stringify({
          email: email,
          password: pass
        });

        //fetch
        fetch(process.env.NEXT_PUBLIC_TOKEN, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },
          body: data,
          credentials: 'include', // Important for cookies
        })
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! :( Status: ${res.status}`);
          }
          return res.json(); // ✅ don't console.log() before parsing
        })
        .then(json => {
          console.log("Login:", json);
          window.location.href = "/";
        })
        .catch(error => {
          console.error("Login error:", error);
        });    
    };
    return(
<div>
    <div>
    <section className="form-container">
      <form onSubmit={handleSubmit}>
        <h3>login now</h3>

        <p>your email <span>*</span></p>
        <input
          type="email"
          name="email"
          placeholder="enter your email"
          required
          maxLength="50"
          className="box"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <p>your password <span>*</span></p>
        <input
          type="password"
          name="pass"
          placeholder="enter your password"
          required
          maxLength="20"
          className="box"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        <input
          type="submit"
          value="login now"
          name="submit"
          className="btn"
        />
      </form>
    </section>
    </div>
</div>
    );
}; 