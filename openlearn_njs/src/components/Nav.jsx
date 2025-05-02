"use client";

import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";

export default function Nav(){
    const [showSidebar, setShowSidebar] = useState(false);
    useEffect(() => {
        if (showSidebar) {
            document.body.classList.add("active");
        } else {
            document.body.classList.remove("active");
        }
    }, [showSidebar]);
    return(
        <nav>
            <Header setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
            <Sidebar showSidebar={showSidebar} />
        </nav>
    );
};