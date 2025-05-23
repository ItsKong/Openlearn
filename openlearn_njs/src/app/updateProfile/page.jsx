"use client";
import { useState } from "react";

export default function UpdateProfile(){
    const [formData, setFormData] = useState({
      username: "",
      f_name: "",
      l_name: "",
      email: "",
      old_pass: "",
      pass: "",
      c_pass: "",
      file: null,
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
      const { name, value, files } = e.target;
      if (name === "file") {
          setFormData({ ...formData, file: files[0] });
      } else {
          setFormData({ ...formData, [name]: value });
      }
    };


    const handleSubmit = (e) => {
      e.preventDefault();
      if (formData.pass !== formData.c_pass) {
        setError("Passwords do not match");
        return;
      } else {
        // Normally you'd send this using fetch or axios to a server route or API endpoint
        const data = new FormData();
        data.append("username", formData.username);
        data.append("f_name", formData.f_name);
        data.append("l_name", formData.l_name);
        data.append("email", formData.email);
        data.append("password", formData.pass);
        // data.append("file", formData.file);
        console.log("Form submitted:", data);
        fetch(process.env.NEXT_PUBLIC_REGISTER, {
            method: "POST",
            body: data,
            credentials: "include",  // 👈 IMPORTANT
        })
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! :( Status: ${res.status}`);
          }
          return res.json(); // ✅ don't console.log() before parsing
        })
        .then(json => {
          console.log("Registered:", json);
          router.push("/")
        })
        .catch(error => {
          console.error("Register error:", error);
        });    
        }
      setError("")
      console.log(formData);
    };
    
    return(
<div>
<section className="form-container">
<form onSubmit={handleSubmit} encType="multipart/form-data">
                <h3>Update profile</h3>
                <p>Username <span>*</span></p>
                <input
                    type="text"
                    name="username"
                    placeholder="enter your username"
                    required
                    maxLength={50}
                    className="box"
                    value={formData.username}
                    onChange={handleChange}
                />

                <p>Firstname <span>*</span></p>
                <input
                    type="text"
                    name="f_name"
                    placeholder="enter your firstname"
                    required
                    maxLength={50}
                    className="box"
                    value={formData.f_name}
                    onChange={handleChange}
                />

                <p>Lastname <span>*</span></p>
                <input
                    type="text"
                    name="l_name"
                    placeholder="enter your lastname"
                    required
                    maxLength={50}
                    className="box"
                    value={formData.l_name}
                    onChange={handleChange}
                />

                <p>previous password <span>*</span></p>
                <input
                  type="password"
                  name="old_pass"
                  placeholder="enter your old password"
                  maxLength="20"
                  className="box"
                  onChange={handleChange}
                />

                <p>new password <span>*</span></p>
                <input
                  type="password"
                  name="new_pass"
                  placeholder="enter your new password"
                  maxLength="20"
                  className="box"
                  onChange={handleChange}
                />
                <p>confirm password <span>*</span></p>
                <input
                    type="password"
                    name="c_pass"
                    placeholder="confirm your password"
                    required
                    maxLength={20}
                    className="box"
                    value={formData.c_pass}
                    onChange={handleChange}
                />
                {error && <p className="error-msg">{error}</p>}

                <input
                    type="submit"
                    value="register now"
                    name="submit"
                    className="btn"
                />
            </form>
    </section>
</div>
    );
};