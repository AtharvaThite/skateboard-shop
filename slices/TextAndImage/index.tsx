import { FC } from "react";
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import clsx from "clsx";

import { Bounded } from "@/components/bounded";
import { Heading } from "@/components/Headings";
import { ButtonLink } from "@/components/ButtonLink";
import ParallaxImage from "./ParallaxImage";

// Extend CSSProperties to include the custom --index property
declare module "react" {
  interface CSSProperties {
    "--index"?: number;
  }
}

/**
 * Props for `TextAndImage`.
 */
export type TextAndImageProps = SliceComponentProps<Content.TextAndImageSlice>;

/**
 * Component for "TextAndImage" Slices.
 *
 * This component renders a section with a heading, rich text body, a button link,
 * and two images (background and foreground). The appearance of the section is
 * determined by the theme specified in the slice's primary data.
 */
const TextAndImage: FC<TextAndImageProps> = ({ slice, index }) => {
  // Extract the theme from the slice's primary data
  const theme = slice.primary.theme;

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={clsx(
        "sticky top-[calc(var(--index)*2rem)]", // Sticky positioning based on index
        theme === "Blue" && "bg-texture bg-brand-blue text-white",
        theme === "Orange" && "bg-texture bg-brand-orange text-white",
        theme === "Navy" && "bg-texture bg-brand-navy text-white",
        theme === "Lime" && "bg-texture bg-brand-lime text-white"
      )}
      style={{ "--index": index }} // Custom CSS property for index
    >
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-24">
        <div
          className={clsx(
            "flex flex-col items-center gap-8 text-center md:items-start md:text-left",
            slice.variation === "imageOnLeft" && "md:order-2" // Order adjustment for image on left variation
          )}
        >
          {/** Render the heading */}
          <Heading size="lg" as="h2">
            <PrismicText field={slice.primary.heading}></PrismicText>
          </Heading>

          {/** Render the rich text body */}
          <div className="max-w-md text-lg leading-relaxed">
            <PrismicRichText field={slice.primary.body}></PrismicRichText>
          </div>

          {/** Render the button link */}
          <ButtonLink
            field={slice.primary.button}
            color={theme === "Lime" ? "orange" : "lime"}
          >
            {slice.primary.button.text}
          </ButtonLink>
        </div>

        {/** Render the parallax images */}
        <ParallaxImage
          foregroundImage={slice.primary.foreground_image}
          backgroundImage={slice.primary.background_image}
        ></ParallaxImage>
      </div>
    </Bounded>
  );
};

export default TextAndImage;
