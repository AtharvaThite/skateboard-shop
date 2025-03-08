"use client";

import { KeyTextField } from "@prismicio/client";
import { useEffect, useRef, useState } from "react";

type VideoProps = {
  youTubeID: KeyTextField;
};

/**
 * LazyYouTubePlayer component renders a YouTube video player that loads lazily
 * when the component comes into view.
 *
 * @param {VideoProps} props - The props for the component.
 * @returns {JSX.Element} The JSX code to render the YouTube video player.
 */
export function LazyYouTubePlayer({ youTubeID }: VideoProps) {
  // State to track if the component is in view
  const [isInView, setIsInView] = useState(false);
  // Ref to access the container DOM element
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentContainerRef = containerRef.current;
    // Create an IntersectionObserver to observe when the component comes into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0, rootMargin: "1500px" } // Load the video when it is within 1500px of the viewport
    );

    // Start observing the container element
    if (currentContainerRef) {
      observer.observe(currentContainerRef);
    }

    // Cleanup the observer on component unmount
    return () => {
      if (currentContainerRef) {
        observer.unobserve(currentContainerRef);
      }
    };
  }, []);

  return (
    <div className="relative h-full w-full" ref={containerRef}>
      {isInView && (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youTubeID}?autoplay=1&mute=1&loop=1&playlist=${youTubeID}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          className="pointer-events-none h-full w-full border-0"
        />
      )}
    </div>
  );
}
