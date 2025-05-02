"use client";

import Header from "@/components/Header";
import SideBar from "@/components/Sidebar";
import { useState } from "react";

export default function Login(){
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // handle login logic here
        console.log("Email:", email);
        console.log("Password:", pass);
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