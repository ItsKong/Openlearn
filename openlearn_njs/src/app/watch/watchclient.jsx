"use client";
// pages/watch.jsx
import { useSearchParams  } from 'next/navigation';
import { useEffect, useState, Suspense} from 'react';
import Image from 'next/image';

export default function Watch(){
    const searchParams = useSearchParams ();
    const video = searchParams.get('video');
    const course = searchParams.get('course');
    const [vdata, setVdata] = useState(null);
    const [cdata, setDdata] = useState(null); 

    useEffect(() => {
        const full_url = `${process.env.NEXT_PUBLIC_GET_VIDEO_BY_ID}${video}`
        fetch(full_url, {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => setVdata(data))
        .catch(err => console.error("Error fetching video:", err));
    }, [])

    useEffect(() => {
        const full_url = `${process.env.NEXT_PUBLIC_GET_COURSE}${course}`
        fetch(full_url, {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => setDdata(data))
        .catch(err => console.error("Error fetching course:", err));
    }, [])

    console.log(vdata, cdata)
    if (!vdata || !cdata) return <p>Loading...</p>;
    if (!cdata.img) return <div>Loading image...</div>;
    return(
<Suspense fallback={<div>Loading...</div>}>
        <section className="watch-video">
        <div className="video-container">
           <div className="video">
            {vdata.video_url ? (
                <video src={vdata.video_url.replace('./openlearn_njs/public', '')} 
                controls poster={vdata.thumbnail.replace('./openlearn_njs/public', '')} id="video"></video>
            ) : (
                <div>Video not found.</div>
            )}
           </div>
           <h3 className="title">{vdata.title}</h3>
           <div className="info">
              <p className="date"><i className="fas fa-calendar"></i><span>{vdata.created_at}</span></p>
           </div>
           <div className="tutor">
            <div className="w-20 h-20 relative rounded-full overflow-hidden">
                <Image src={cdata.img.replace('./openlearn_njs/public', '')}
                alt="tutor image"
                fill
                className="object-cover w-full h-full rounded-full"
                />
            </div>
            <div>
                <h3>{cdata.tutor}</h3>
            </div>
            </div>
           <form action="" method="post" className="flex">
              <a href={`/playlist/${cdata.id}`} className="inline-btn">view playlist</a>
              
           </form>
           <p className="description">
             {vdata.detail}
           </p>
        </div>
     </section>
</Suspense>
    );
};