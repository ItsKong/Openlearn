"use client";
import { useState } from "react";

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        pass: "",
        c_pass: "",
        file: null,
    });

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

        // Normally you'd send this using fetch or axios to a server route or API endpoint
        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("pass", formData.pass);
        data.append("c_pass", formData.c_pass);
        data.append("file", formData.file);

        // Example:
        // fetch("/api/register", {
        //   method: "POST",
        //   body: data
        // });

        console.log("Form submitted:", formData);
    };
    return (
<div>
    <div>
        <section className="form-container">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <h3>register now</h3>

                <p>your name <span>*</span></p>
                <input
                    type="text"
                    name="name"
                    placeholder="enter your name"
                    required
                    maxLength={50}
                    className="box"
                    value={formData.name}
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

                <p>select profile <span>*</span></p>
                <input
                    type="file"
                    name="file"
                    accept="image/*"
                    required
                    className="box"
                    onChange={handleChange}
                />

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