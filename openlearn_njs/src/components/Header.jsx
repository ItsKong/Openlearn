"use client";

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Header({ showSidebar, setShowSidebar}){
    const [searchQuery, setSearchQuery] = useState('');
    const [showProfile, setShowProfile] = useState(false);
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return(
<>
    <header className="header">

        <section className="flex">
            <Link href="/">
                <Image 
                    src="/images/logos.png" 
                    alt="Logo"
                    width={150} 
                    height={50}
                    className="logo"
                    />
            </Link>
            <form onSubmit={handleSubmit} className="search-form">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    required
                    placeholder="search courses..."
                    maxLength={100}
                />
                <button type="submit" className="fas fa-search"></button>
            </form>

            <div className="icons">
                <div id="menu-btn" className="" onClick={() => setShowSidebar(!showSidebar)}>
                    <p>Menu</p>
                </div>
                <div id="search-btn" className="fas fa-search"></div>
                <div id="toggle-btn" className="fas fa-sun">
                    <p>D/L</p>
                </div>
            </div>
        </section>

    </header>
</>
    )
}