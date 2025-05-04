"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';



export default function Profile(){
    const [users, setUser] = useState(null);
    const router = useRouter()
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
    useEffect(() => {
        if (users) {
            router.replace("/login"); // 🔄 Redirects without adding to history
        }
    }, [])
    return(
<div>
    <div>
    <section className="user-profile">

        <h1 className="heading">your profile</h1>

        <div className="info">
        {users ? (
            <div className="user">
                <div className="flex justify-center">
                    <Image src="/images/pic-1.jpg" alt="" width={100} height={100} />
                </div>
                <h3>{users.first_name} {users.last_name}</h3>
                <p>{users.email}</p>
                <Link href="/updateProfile" className="inline-btn">update profile</Link>
            </div>
        ): (
            <p></p>
        )}
        </div>

    </section>
    <section className="courses">

      <h1 className="heading"><i className="far fa-bookmark"></i> saved playlist (number)</h1>
        <h1 className="heading">From db</h1>
   </section>
    </div>
</div>
    );
};