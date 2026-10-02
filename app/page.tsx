"use client";

import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Activity } from "./sections/Activity";
import { Contact } from "./sections/Contact";
// import { Loader } from "@/components/Loader";

export default function Page() {
  return (
    <>
      {/* <Loader /> */}
      <Header />

      <main className=" absolute top-0">
        <Hero />
        <About />
        <Activity />
        <Contact/>
      </main>
      <footer></footer>
    </>
  );
}
