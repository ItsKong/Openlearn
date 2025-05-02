"use client";

import Image from "next/image"
import Link from "next/link"

export default function SideBar({ showSidebar }){
    return(
<>
<div className={`side-bar ${showSidebar ? "active" : ""}`}>
      <div id="close-btn">
         <i className="fas fa-times"></i>
      </div>

      <div className="profile">
         <Image src="/images/pic-1.jpg" className="image" alt="pic-1" width={50} height={50}/>
         <h3 className="name">Pearapat Sangsri</h3>
         <p className="role">student</p>
         <Link href="/profile" className="btn">view profile</Link>
      </div>

      <nav className="navbar">
         <Link href="/"><i className="fas fa-home"></i><span>home</span></Link>
         <Link href="/courses"><i className="fas fa-graduation-cap"></i><span>courses</span></Link>
         <Link href="/dashboard"><i className="fa-solid fa-table-columns"></i><span>dashboard</span></Link>
      </nav>

   </div>
</>
    )
}