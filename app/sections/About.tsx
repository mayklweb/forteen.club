import Image from "next/image";
import React from "react";

export function About() {
  return (
    <section id="about" className="mt-40">
      <div className="container">
        <div className="w-full flex flex-col lg:flex-row gap-10">
          <div className="w-[60%] flex flex-col justify-between">
            <p className="text-[40px] leading-[120%] font-medium tracking-tight">
              Forteen membership is about being part of an active community and
              having more experiences to look forward to. Members get closer to
              the people, activities, and moments that make the Forteen
              lifestyle unique.
            </p>
            <p className="w-[60%] text-[16px] leading-[120%]">
              From organized rides, runs, hikes, and snowboarding trips to
              international travel, private dinners, and social events —
              membership opens the door to experiences designed to bring people
              together. Meet like-minded people. Discover new places. Try
              something different. Build connections that go beyond the
              activity.
            </p>
          </div>
          <div className="w-[40%]">
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
