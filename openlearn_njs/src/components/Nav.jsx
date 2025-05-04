"use client";

import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";

export default function Nav(){
    const [showSidebar, setShowSidebar] = useState(false);
    const [user, setUser] = useState(null);
    useEffect(() => {
        if (showSidebar) {
            document.body.classList.add("active");
        } else {
            document.body.classList.remove("active");
        }
    }, [showSidebar]);

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_GET_PROFILE, {
        method: 'GET',
        credentials: 'include', // 🔑 This sends cookies with the request
        }).then(res => {
            if (!res.ok) {
            throw new Error('Unauthorized');
            }
            return res.json();
        }).then(data => setUser(data)).catch(() => setUser(null));
    }, []);


    return(
        <nav>
            <Header setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
            <Sidebar showSidebar={showSidebar} user={user}/>
        </nav>
    );
};