import Image from "next/image";

export default function Playlist(){

    return(
<div>
<section className="playlist-details">

    <h1 className="heading">courses details</h1>

    <div className="row">

    <div className="column">
        <form action="" method="post" className="save-playlist">
            <button type="submit"><i className="far fa-bookmark"></i> <span>save playlist</span></button>
        </form>

        <div className="thumb">
            <Image src="/images/thumb-1.png" alt="" width={100} height={100}/>
            <span>10 videos</span>
        </div>
    </div>
    <div className="column">
        <div className="tutor">
            <Image src="/images/pic-2.jpg" alt="" width={100} height={100}/>
            <div>
                <h3>john deo</h3>
                <span>21-10-2022</span>
            </div>
        </div>

        <div className="details">
            <h3>complete HTML tutorial</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum minus reiciendis, error sunt veritatis
                exercitationem deserunt velit doloribus itaque voluptate.</p>
            <a href="#" className="inline-btn">enroll course</a>
        </div>
    </div>
    </div>

</section>
</div>
    );
};