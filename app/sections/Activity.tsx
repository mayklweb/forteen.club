"use client";

import Image from "next/image";

const hikingItems = [
  { image: "/media/image.png", text: "Conquer new peaks", title: "HIKING" },
  { image: "/media/image.png", text: "Move with purpose", title: "RUNNING" },
  { image: "/media/image.png", text: "Chase the road", title: "CYCLING" },
  // { image: "/media/image.png", text: "Conquer new peaks", title: "SNOWBOARDING" },
];

export function Activity() {
  return (
    <section id="hiking" className="mt-40">
      <div className="hidden">
        {hikingItems.map((item, i) => (
          <div key={i}>
            <div className="parallax relative w-full h-screen lg:h-full overflow-hidden">
              <div className="parallax-img h-full w-full">
                <Image
                  src={item.image}
                  alt=""
                  width={1440}
                  height={960}
                  className="block w-full h-full object-cover"
                />
              </div>

              <p className="absolute top-1/2 w-full -translate-y-1/2 px-5 text-center text-4xl font-semibold tracking-tight text-[#F5F4EF] md:text-6xl lg:text-8xl">
                {item.text}
              </p>
            </div>

            {/* <div className="flex h-[100dvh] w-full items-center justify-center">
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-8xl">
              {item.title}
            </h1>
          </div> */}
          </div>
        ))}
      </div>
      <div className="w-full flex gap-5 flex-col items-center text-4xl lg:text-8xl font-extrabold tracking-tighter">
        <div>
          <h1>HIKING</h1>
        </div>
        <div>
          <h1>RUNNING</h1>
        </div>
        <div>
          <h1>CICLING</h1>
        </div>
        <div>
          <h1>SNOWBOARDING</h1>
        </div>
        <div>
          <h1>INTERNATIONAL TRIPS</h1>
        </div>
        <div>
          <h1>SOCIAL EVENTS</h1>
        </div>
        <div>
          <h1>PRIVATE DINNERS</h1>
        </div>
      </div>
    </section>
  );
}
