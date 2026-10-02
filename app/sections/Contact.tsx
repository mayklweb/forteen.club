import React from "react";

export function Contact() {
  return (
    <div className="w-full h-screen">
      <div className="w-full h-full flex gap-5 flex-col items-center justify-center">
        <h1 className="text-6xl lg:text-9xl text-center tracking-tighter leading-[80%] font-serif italic">
          Ready for <br /> your next big <br /> experience?
        </h1>
        <p className="text-sm lg:text-lg leading-[120%] tracking-tight text-center lg:mt-10">
          Join Forteen and become part of a community <br /> that moves,
          explores, andcomes together. 
        </p>
        <button className="py-2.5 px-10 text-[#F5F4EF] bg-[#2A2928] rounded-full tracking-tight">
          JOIN FORTEEN
        </button>
      </div>
    </div>
  );
}
