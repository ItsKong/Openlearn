"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';



export default function Profile(){
    const [users, setUser] = useState(null);
    const [saveCourse, setSaveCourse] = useState([]);
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

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_GET_SAVE_COURSE, {
            method: "GET",
            credentials: 'include'

        }).then(res => {
            if (!res.ok) {
            throw new Error('Unauthorized');
            }
            return res.json();
        }).then(data => setSaveCourse(data)).catch(() => setSaveCourse([]));
    }, []);
    if (!saveCourse) return <p>Loading</p>

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
        <div className="box-container">

        {saveCourse.length > 0 ? (
            saveCourse.map((course, index) => (
                <div className="box" key={index}>
                    <div className="tutor">
                        <div className="w-20 h-20 relative rounded-full overflow-hidden">
                            <Image src={course.img.replace('./openlearn_njs/public', '')}
                            alt="tutor image"
                            fill
                            className="object-cover w-full h-full rounded-full"
                            />
                        </div>
                        <div className="info">
                            <h3>{course.tutor}</h3>
                            <span>{course.create_at}</span>
                        </div>
                    </div>
                    <div className="thumb">
                        <div className="w-full h-[20rem] relative">
                            <Image 
                            src={course.thumbnail.replace('./openlearn_njs/public', '')} 
                            alt="course thumbnail"
                            fill
                            className="object-cover w-full h-full rounded"
                            />
                        </div>
                        {course.video_count > 0 ? (
                            <span>{`${course.video_count} videos`}</span>
                        ) : (
                            <span>{`comming soon!`}</span>
                        )}
                    </div>
                    <h3 className="title">{course.title}</h3>
                    <Link href={`playlist/${course.id}`} className="inline-btn">view courses</Link>
                </div>
                ))
            ) : (
                <div className="box">
                    <h1>No course</h1>
                </div>
        )}
        </div>
   </section>
    </div>
</div>
    );
};