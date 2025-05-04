"use client";

import Image from "next/image"
import Link from "next/link"

export default function SideBar({ showSidebar, user }){
   const handleLogout = (e) => {
      e.preventDefault();
      fetch(process.env.NEXT_PUBLIC_LOG_OUT, {
         method: 'POST',
         credentials: "include",
      }).then(res => {
         if (!res.ok) {
           throw new Error(`HTTP error! :( Status: ${res.status}`);
         }
         return res.json(); // ✅ don't console.log() before parsing
       })
       .then(json => {
         console.log("Logout success :", json);
         window.location.href = "/";
       })
       .catch(error => {
         console.error("Logout error:", error);
       });  
   }
   console.log(process.env.NEXT_PUBLIC_LOG_OUT)
   return(
<>
<div className={`side-bar ${showSidebar ? "active" : ""}`}>
      <div id="close-btn">
         <i className="fas fa-times"></i>
      </div>
      <div className="profile">
         {user ? (
               <>
               <div className="flex justify-center">                   
                  <Image src="/images/pic-1.jpg" className="image" alt="pic-1" width={100} height={100} />
               </div>
               <h3 className="name">{user.first_name} {user.last_name}</h3>
               <Link href="/profile" className="btn">view profile</Link>
               <button onClick={handleLogout} className="btn">Logout</button> 
               </>
         ) : (
               <div className="flex-btn">
               <Link href="/login" className="option-btn">login</Link>
               <Link href="/register" className="option-btn">register</Link>
               </div>
         )}
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