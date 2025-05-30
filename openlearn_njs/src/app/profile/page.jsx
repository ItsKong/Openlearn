"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import Swal from "sweetalert2";



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

    async function handleSave(e, course_id) {
        e.preventDefault();

        try{
            const full_url = `${process.env.NEXT_PUBLIC_POST_SD_COURSE}${course_id}`
            const response = await fetch(full_url, {
                method: 'POST',
                credentials: 'include',
            });
            const data = await response.json();
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Course Deleted!',
                    showConfirmButton: false,
                    timer: 1500,
                });
                window.location.reload();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: data.error || 'Something went wrong',
                    showConfirmButton: true,
                });
            }
        } catch (err) {
            console.error(err);
            alert('Error saving course');
        }
    }

    return(
<div>
    <div>
    <section className="user-profile">

        <h1 className="heading">your profile</h1>

        <div className="info">
        {users ? (
            <div className="user">
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
                    <div className="flex gap-3">
                        <Link href={`playlist/${course.id}`} className="inline-btn">view courses</Link>
                        <button className="inline-btn p-2" onClick={(e) => handleSave(e, course.id)}>
                            Delete Course
                        </button>
                    </div>
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