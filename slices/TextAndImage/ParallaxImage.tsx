"use client";

import { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import React, { useEffect, useRef } from "react";

type Props = {
  foregroundImage: ImageField;
  backgroundImage: ImageField;
  className?: string;
};

/**
 * ParallaxImage component renders two images (foreground and background) with a parallax effect.
 *
 * @param {Props} props - The props for the component.
 * @returns {JSX.Element} The JSX code to render the parallax images.
 */
export default function ParallaxImage({
  foregroundImage,
  backgroundImage,
  className,
}: Props) {
  // Refs to access the DOM elements for background and foreground images
  const backgroundRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);

  // Refs to store the target and current positions for the parallax effect
  const targetPosition = useRef({ x: 0, y: 0 });
  const currentPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Request animation frame for smooth parallax effect
    const frameId = requestAnimationFrame(animationFrame);
    // Add mousemove event listener to update target position
    window.addEventListener("mousemove", onMouseMove);

    function onMouseMove(event: MouseEvent) {
      const { innerWidth, innerHeight } = window;
      const xPercent = (event.clientX / innerWidth - 0.5) * 2; // Range between -1 and 1
      const yPercent = (event.clientY / innerHeight - 0.5) * 2; // Range between -1 and 1

      // Update target position based on mouse movement
      targetPosition.current = { x: xPercent * -20, y: yPercent * -20 };
    }

    function animationFrame() {
      const { x: targetX, y: targetY } = targetPosition.current;
      const { x: currentX, y: currentY } = currentPosition.current;

      // Smoothly interpolate the current position towards the target position
      const newX = currentX + (targetX - currentX) * 0.1;
      const newY = currentY + (targetY - currentY) * 0.1;
      currentPosition.current = { x: newX, y: newY };

      // Apply the parallax effect to the background image
      if (backgroundRef.current) {
        backgroundRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
      }

      // Apply a stronger parallax effect to the foreground image
      if (foregroundRef.current) {
        foregroundRef.current.style.transform = `translate(${newX * 2.5}px, ${newY * 2.5}px)`;
      }

      // Request the next animation frame
      requestAnimationFrame(animationFrame);
    }

    // Cleanup event listener and animation frame on component unmount
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className={clsx("grid grid-cols-1 place-items-center", className)}>
      <div
        ref={backgroundRef}
        className="row-start-1 col-start-1 transition-transform"
      >
        <PrismicNextImage
          field={backgroundImage}
          alt=""
          className="w-11/12"
        ></PrismicNextImage>
      </div>
      <div
        ref={foregroundRef}
        className="row-start-1 col-start-1 transition-transform h-full w-full place-items-center"
      >
        <PrismicNextImage
          field={foregroundImage}
          alt=""
          imgixParams={{ height: 600 }}
          className="h-full max-h-[500px] w-auto"
        ></PrismicNextImage>
      </div>
    </div>
  );
}
