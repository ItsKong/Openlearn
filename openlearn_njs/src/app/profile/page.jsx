import Image from "next/image";
import Link from "next/link";

export default function Profile(){
    return(
<div>
    <div>
    <section className="user-profile">

        <h1 className="heading">your profile</h1>

        <div className="info">

            <div className="user">
                <Image src="/images/pic-1.jpg" alt="" width={100} height={100}/>
                <h3>Pearapat Sangsri</h3>
                <p>student</p>
                <p>pearapat@gmail.com</p>
                <Link href="/updateProfile" className="inline-btn">update profile</Link>
            </div>
        </div>

    </section>
    <section className="courses">

      <h1 className="heading"><i class="far fa-bookmark"></i> saved playlist (number)</h1>
        <h1 className="heading">From db</h1>
   </section>
    </div>
</div>
    );
};