'use client'

import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "@/public/assets/404.json";

export default function NotFoundPage() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: animationData,
      });
    }
  }, []);

  return (
    <section className="w-screen h-[75vh] flex justify-center items-center text-white">
      <div ref={container} style={{ width: "300px", height: "300px" }}></div>
    </section>
  );
}