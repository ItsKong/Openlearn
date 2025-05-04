"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function courese(){
    const [courses, setCourses] = useState([])
    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_GET_COURSES, {
            method: "GET",
            credentials: "include",
        }).then(res => {
            if(!res.ok){
                throw new Error ("Error fetching courses")
            }
            return res.json()
        }).then(data => {
            console.log("Fetched courses:", data); // 🔍 Debug response
            setCourses(data);
        })
        .catch(error => {
            console.error("Fetch error:", error);
            setCourses([]);    
        })
    }, [])

    return(
<div>
<section className="courses">
    <h1 className="heading">our courses (DB)</h1>
    <div className="box-container">

    {courses.length > 0 ? (
        courses.map((course, index) => (
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
    );
};