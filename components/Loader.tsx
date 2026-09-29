// "use client";

// import gsap from "gsap";
// import { CustomEase } from "gsap/CustomEase";
// import { useEffect, useRef, useState } from "react";

// gsap.registerPlugin(CustomEase);

// CustomEase.create("custom", "0, 0.8, 1, 1");

// const VIDEO_URL =
//   "https://quechua-lookbook.com/ss25/wp-content/uploads/2025/01/loop-2.mp4";

// const rotatePositions = [5.5, -5, 5.5, -5];

// export function Loader() {
//   // const loader = useRef<HTMLDivElement>(null);
//   const images = useRef<HTMLDivElement[]>([]);
//   const video = useRef<HTMLVideoElement>(null);

//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const imageItems = images.current.filter(Boolean);

//     gsap.set(imageItems, {
//       scale: 0,
//       rotate: (i) => rotatePositions[i],
//     });

//     gsap.set(video.current, {
//       scale: 0,
//       rotate: 5.5,
//     });

//     const tl = gsap.timeline({
//       delay: 0.5,
//     });

//     // Images
//     tl.to(imageItems, {
//       scale: 1,
//       duration: 0.5,
//       ease: "custom",
//       stagger: 0.5,
//     });

//     // Final video
//     tl.to(video.current, {
//       scale: 1,
//       rotate: 0,
//       duration: 0.8,
//       ease: "custom",
//     });

//     // Loader disappear
//     tl.to(loader.current, {
//       opacity: 0,
//       duration: 0.8,
//       ease: "power2.inOut",
//       onComplete: () => {
//         setIsLoading(false);

//         window.dispatchEvent(new Event("loaderComplete"));
//       },
//     });

//     return () => {
//       tl.kill();
//     };
//   }, []);

//   if (!isLoading) {
//     return null;
//   }

//   return (
//     <div
//       ref={loader}
//       className="fixed inset-0 z-[100] h-screen w-full bg-white"
//     >
//       <div className="relative h-full w-full">
//         {/* Images */}
//         {[0, 1, 2, 3].map((i) => (
//           <div
//             key={i}
//             ref={(el) => {
//               if (el) images.current[i] = el;
//             }}
//             className="absolute left-1/2 top-1/2 h-[200px] w-[260px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl"
//           >
//             <img
//               src="/media/image.png"
//               alt=""
//               className="h-full w-full object-cover"
//             />
//           </div>
//         ))}

//         {/* Final Hero video */}
//         <div className="absolute inset-0">
//           <video
//             ref={video}
//             autoPlay
//             loop
//             muted
//             playsInline
//             preload="auto"
//             className="h-full w-full object-cover"
//           >
//             <source src={VIDEO_URL} type="video/mp4" />
//           </video>
//         </div>

//         {/* Loading */}
//         <div className="absolute bottom-8 left-8 z-10">
//           <p className="text-sm font-medium text-black">100%</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Loader;
