"use client";

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Header({ showSidebar, setShowSidebar }){
    const [searchQuery, setSearchQuery] = useState('');
    const [showProfile, setShowProfile] = useState(false);
    // const [showSidebar, setShowSidebar] = useState(false);
    const router = useRouter();

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
                <Image src="/images/pic-1.jpg" className="image" alt="pic-1" width={50} height={50}/>
                <h3 className="name">Pearapat Sangsri</h3>
                <p className="role">student</p>
                <Link href="profile" className="btn">view profile</Link>
                <div className="flex-btn">
                    <Link href="login" className="option-btn">login</Link>
                    <Link href="register" className="option-btn">register</Link>
                </div>
            </div>
            {/* )} */}
        </section>

    </header>
</>
    )
}