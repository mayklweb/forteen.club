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
      {hikingItems.map((item, i) => (
        <div key={i}>
          <div className="parallax relative w-full overflow-hidden">
            <div className="parallax-img relative w-full ">
              <Image
                src={item.image}
                alt=""
                width={1440}
                height={960}
                className="block h-auto w-full"
              />
            </div>

            <p className="absolute top-1/2 w-full -translate-y-1/2 text-center text-6xl lg:text-8xl font-bold tracking-tight text-[#F5F4EF]">
              {item.text}
            </p>
          </div>

          <div className="flex h-svh w-full items-center justify-center">
            <h1 className="text-8xl font-bold tracking-tight">{item.title}</h1>
          </div>
        </div>
      ))}
    </section>
  );
}
