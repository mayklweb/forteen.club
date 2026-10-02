import Image from "next/image";
import React from "react";

export function About() {
  return (
    <section id="about" className="mt-40">
      <div className="container">
        <div className="w-full flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-[60%] flex flex-col justify-between">
            <p className="text-2xl lg:text-5xl font-bold tracking-tight">
              MORE THAN A CLUB. <br /> A COMMUNITY IN MOTION.
            </p>
            <p className="w-full lg:w-[60%] text-base leading-[120%] mt-10">
              Forteen brings people together through movement, experiences, and
              shared moments. From hiking and running to parties, trips,
              dinners, and more — every event is an opportunity to meet new
              people and experience something different together.
            </p>
          </div>
          <div className="w-full lg:w-[40%]">
            <Image
              src={
                "https://quechua-lookbook.com/ss25/wp-content/uploads/2025/02/Image-Footer.png"
              }
              alt=""
              width={300}
              height={600}
              className="w-full h-[600px] object-cover rounded-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
