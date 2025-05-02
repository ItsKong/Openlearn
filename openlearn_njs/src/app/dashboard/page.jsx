import Image from "next/image";

export default function Dashbaord(){
    return(
<div>
    <section className="enrolled-courses">

        <h1 className="heading">enrolled courses</h1>

        <div className="box-container">

            <div className="box">
            <div className="thumb">
                <Image src="/images/thumb-1.png" alt="Course Thumbnail" width={100} height={100}/>
            </div>
            <div className="info">
                <h3>Complete HTML Tutorial</h3>
                <p>Enrolled on: 21-10-2022</p>
                <a href="playlist.html" className="details-link">View Details</a>
            </div>
            </div>

            <div className="box">
            <div className="thumb">
                <Image src="/images/thumb-2.png" alt="Course Thumbnail"width={100} height={100}/>
            </div>
            <div className="info">
                <h3>CSS for Beginners</h3>
                <p>Enrolled on: 15-11-2022</p>
                <a href="playlist.html" className="details-link">View Details</a>
            </div>
            </div>

            <div className="box">
            <div className="thumb">
                <Image src="/images/thumb-3.png" alt="Course Thumbnail"width={100} height={100}/>
            </div>
            <div className="info">
                <h3>JavaScript Essentials</h3>
                <p>Enrolled on: 05-12-2022</p>
                <a href="playlist.html" className="details-link">View Details</a>
            </div>
            </div>

        </div>

   </section>
</div>
    );
};