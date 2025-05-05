"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Dashbaord(){
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
    <section className="enrolled-courses">

        <h1 className="heading">enrolled courses</h1>

        <div className="box-container">
            {courses.length > 0 ? (
                courses.map((course, index) => (
                    <div className="box" key={index}>
                        <div className="thumb">
                            <div className="relative w-[20rem] h-[10rem]">
                                <Image src={course.thumbnail.replace('./openlearn_njs/public', '')} 
                                alt="Course Thumbnail" 
                                // width={200}
                                // height={150}
                                fill
                                className="object-cover w-full h-full rounded"
                                />
                            </div>
                        </div>
                        <div className="info">
                            <h3 className="text-[2rem]">{course.title}</h3>
                            <p className="text-[1.7rem]">{`Created at: ${course.created_at}`}</p>
                            <a href={`/playlist/${course.id}`} className="details-link">View Details</a>
                        </div>
                    </div>
                ))
            ) : (
                <div>
                    <h1 className="Header">No course</h1>
                </div>
            )}
        </div>

   </section>
</div>
    );
};