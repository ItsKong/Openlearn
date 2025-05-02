"use client";
import { useState } from "react";

export default function UpdateProfile(){
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        old_pass: "",
        new_pass: "",
        c_pass: "",
        pic: null,
    });

    const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
        ...prev,
        [name]: files ? files[0] : value,
    }));
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: handle form submission (e.g., fetch/axios POST)
    console.log(formData);
    };
    
    return(
<div>
<section className="form-container">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <h3>update profile</h3>

        <p>update name</p>
        <input
          type="text"
          name="name"
          placeholder="Pearapat Sangsri"
          maxLength="50"
          className="box"
          onChange={handleChange}
        />

        <p>update email</p>
        <input
          type="email"
          name="email"
          placeholder="pearapat@gmail.com"
          maxLength="50"
          className="box"
          onChange={handleChange}
        />

        <p>previous password</p>
        <input
          type="password"
          name="old_pass"
          placeholder="enter your old password"
          maxLength="20"
          className="box"
          onChange={handleChange}
        />

        <p>new password</p>
        <input
          type="password"
          name="new_pass"
          placeholder="enter your new password"
          maxLength="20"
          className="box"
          onChange={handleChange}
        />

        <p>confirm password</p>
        <input
          type="password"
          name="c_pass"
          placeholder="confirm your new password"
          maxLength="20"
          className="box"
          onChange={handleChange}
        />

        <p>update pic</p>
        <input
          type="file"
          name="pic"
          accept="image/*"
          className="box"
          onChange={handleChange}
        />

        <input type="submit" value="update profile" name="submit" className="btn" />
      </form>
    </section>
</div>
    );
};