"use client";

import Image from "next/image";
import Link from "next/link";
import Swal from 'sweetalert2';
import { use, useState, useEffect } from "react";

export default function Playlist({ params }){
    const { course_id }= use(params)
    const [course, setCourse] = useState({})
    const [videos, setVideos] = useState([])
    useEffect(() => {
        const full_url = `${process.env.NEXT_PUBLIC_GET_COURSE}${course_id}`
        console.log(full_url)
        fetch(full_url, {
            method: "GET",
        }) 
        .then(res => res.json())
        .then(data => setCourse(data))
        .catch(err => console.error("Error fetching course:", err));
    }, [course_id])

    useEffect(() => {
        const full_url = `${process.env.NEXT_PUBLIC_GET_VIDEO}${course_id}`
        fetch(full_url, {
            method: "GET",
        })
        .then(res => res.json())
        .then(data => setVideos(data))
        .catch(err => console.error("Error fetching videoList:", err));
    }, [])

    async function handleSave(e) {
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
                    title: data.message || 'Course saved!',
                    showConfirmButton: false,
                    timer: 1500,
                });
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

    if (!course) return <div>Loading...</div>;
    if (!course?.thumbnail) return <div>Loading...</div>;
    if (!videos) return <div>Loading...</div>;
    // console.log(videos)
    return(
<div>
<section className="playlist-details">

<h1 className="heading">courses details</h1>
    <div className="row">
        <div className="column">
                <div className="thumb">
                    <div className="w-full h-[30rem] relative">
                        <Image src={course.thumbnail.replace('./openlearn_njs/public', '')}
                        alt="thumbnail"
                        fill
                        sizes=""
                        className="object-cover w-full h-full rounded"/>
                    </div>
                    {course.video_count > 0 ? (
                        <span>{`${course.video_count} videos`}</span>
                    ) : (
                        <span>comming soon!</span>
                    )}
                </div>
            </div>
        <div className="column">
            <div className="tutor">
                <div className="w-20 h-20 relative rounded-full overflow-hidden">
                    <Image src={course.img.replace('./openlearn_njs/public', '')}
                    alt="tutor image"
                    fill
                    className="object-cover w-full h-full rounded-full"
                    />
                </div>
                <div>
                    <h3>{course.tutor}</h3>
                    <span>{course.created_at}</span>
                </div>
            </div>

            <div className="details">
                <h3>{course.title}</h3>
                <p>{course.detail}</p>
                <button className="inline-btn" onClick={(e) => handleSave(e, course_id)}>
                    Save Course
                </button>
            </div>
        </div>
    </div>
</section>
<section className="playlist-videos">
    <h1 className="heading">playlist videos</h1>
    <div className="box-container">
        {videos.length > 0 ? (
            videos.map((video, index) => (
                    <Link className="box transition duration-300 hover:scale-105 hover:bg-gray-100" 
                    href={`/watch?video=${video.id}&course=${course.id}`} key={index}>
                        <i className="fas fa-play"></i>
                        <div className="w-full h-[20rem] relative">
                            <Image src={video.thumbnail.replace('./openlearn_njs/public', '')}
                            alt="thumbnail"
                            fill
                            className="object-cover w-full h-full rounded"
                            />
                        </div>
                        <h3>{video.title}</h3>
                    </Link>
            ))
        ) : (
            <div></div>
        )}
    </div>
</section>
</div>
    );
};