"use client";

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Header({ showSidebar, setShowSidebar }){
    const [searchQuery, setSearchQuery] = useState('');
    const [showProfile, setShowProfile] = useState(false);
    const [user, setUser] = useState(null);
    const router = useRouter();

    
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


    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
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
                <div id="menu-btn" className="" onClick={() => setShowSidebar(!showSidebar)}></div>
                <div id="search-btn" className="fas fa-search"></div>
                <div id="user-btn" className="" onClick={() => setShowProfile(!showProfile)}></div>
                <div id="toggle-btn" className="fas fa-sun"></div>
            </div>
            
            {/* {showProfile && ( */}
            <div className={`profile ${showProfile ? "active" : ""}`}>
            {user ? (
                <>
                <img src="/images/pic-1.jpg" className="image" alt="pic-1" width={50} height={50} />
                <h3 className="name">{user.name || user.username}</h3>
                <p className="role">{user.role}</p>
                <a href="profile" className="btn">view profile</a>
                </>
            ) : (
                <div className="flex-btn">
                <a href="login" className="option-btn">login</a>
                <a href="register" className="option-btn">register</a>
                </div>
            )}
            </div>
            {/* )} */}
        </section>

    </header>
</>
    )
}