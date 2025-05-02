import Image from "next/image";


export default function Home(){
  return(
    <div>
      <div>
      <section className="hero">
        <div style={{ width: "100%", position: "relative", height: "auto" }}>
          <Image
            src="/images/hero.png"
            alt="Hero Image"
            layout="responsive"
            width={1600} // you can adjust based on your actual image
            height={600} // maintain the same aspect ratio
          />
        </div>
      </section>

      <section className="courses">
        <h1 className="heading">our courses</h1>
        {/* Pull from django */}
        <h1 className="heading">Course section DB</h1>
        {/* end */}
        <div className="more-btn">
         <a href="courses.html" className="inline-option-btn">view all courses</a>
        </div>
      </section>
      </div>
    </div>
  );
};