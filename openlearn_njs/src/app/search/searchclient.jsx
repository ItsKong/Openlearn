"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Search(){
    const searchParams = useSearchParams();
    const query = searchParams.get('query');
    const [cdatas, setCdatas] = useState([])

    useEffect(() => {
        if (!query) {
            setCdatas([]);
            return;
        }
        const full_url = `${process.env.NEXT_PUBLIC_GET_SEARCH}${query}`
        fetch(full_url, {
            method: "GET",
        })
        .then(res => res.json())
        .then(data => setCdatas(data))
        .catch(err => console.error("Error fetching video:", err));
    }, [query])
    if (!cdatas) return<p>Loading.........</p>
    return(
<section className="courses">
    <h1 className="heading">Search Result:</h1>
    <div className="box-container">

    {cdatas.length > 0 ? (
        cdatas.map((course, index) => (
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
    );
};