"use client";
import { redirect } from "next/dist/server/api-utils";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        username: "",
        f_name: "",
        l_name: "",
        email: "",
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

        // Example:
        
    };
    console.log("REGISTER URL:", process.env.NEXT_PUBLIC_REGISTER);

    return (
<div>
    <div>
        <section className="form-container">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <h3>register now</h3>
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

                <p>your email <span>*</span></p>
                <input
                    type="email"
                    name="email"
                    placeholder="enter your email"
                    required
                    maxLength={50}
                    className="box"
                    value={formData.email}
                    onChange={handleChange}
                />

                <p>your password <span>*</span></p>
                <input
                    type="password"
                    name="pass"
                    placeholder="enter your password"
                    required
                    maxLength={20}
                    className="box"
                    value={formData.pass}
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

                {/* <p>select profile <span>*</span></p>
                <input
                    type="file"
                    name="file"
                    accept="image/*"
                    required
                    className="box"
                    onChange={handleChange}
                /> */}
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
</div>
    );
};