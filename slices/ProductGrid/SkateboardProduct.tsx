import { ButtonLink } from "@/components/ButtonLink";
import { HorizontalLine, VerticalLine } from "@/components/Line";
import { createClient } from "@/prismicio";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import React, { JSX } from "react";
import { FaStar } from "react-icons/fa6";
import { Scribble } from "./Scribble";

/**
 * Fetches the dominant color from an image URL.
 *
 * @param {string} url - The URL of the image.
 * @returns {Promise<string | undefined>} The dominant color in hex format.
 */
async function getDominantColor(url: string): Promise<string | undefined> {
  const paletteURL = new URL(url);
  paletteURL.searchParams.set("palette", "json");

  const res = await fetch(paletteURL);
  const json = await res.json();

  // console.log(json);

  return (
    json.dominant_colors.vibrant?.hex || json.dominant_colors.vibrant_light?.hex
  );
}

/**
 * Props type definition for SkateboardProduct component.
 * @property {string} id - The ID of the skateboard product to fetch.
 */
type Props = {
  id: string;
};

const VERTICAL_LINE_CLASSES =
  "absolute top-0 h-full stroke-2 text-stone-300 transition-colors group-hover:text-stone-400";

const HORIZONTAL_LINE_CLASSES =
  "-mx-8 stroke-2 text-stone-300 transition-colors group-hover:text-stone-400";

/**
 * SkateboardProduct component fetches and displays a skateboard product's details.
 *
 * @param {Props} props - The props for the component.
 * @returns {JSX.Element} The JSX code to render the skateboard product.
 */
export default async function SkateboardProduct({
  id,
}: Props): Promise<JSX.Element> {
  // Create a Prismic client instance
  const client = createClient();

  // Fetch the skateboard product by ID
  const product = await client.getByID<Content.SkateboardDocument>(id);

  // Determine the price of the product, or show a default message if not available
  const price = isFilled.number(product.data.price)
    ? new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0, // Ensures at least 2 decimal places
        maximumFractionDigits: 2, // Limits to 2 decimal places
        currencyDisplay: "symbol", // Ensures ₹ symbol is shown
      })
        .formatToParts(product.data.price)
        .map((part) =>
          part.type === "currency" ? part.value + " " : part.value
        ) // Adds space after ₹
        .join("")
    : "Price Not Available";

  // Fetch the dominant color of the product image
  const dominantColor = isFilled.image(product.data.image)
    ? await getDominantColor(product.data.image.url)
    : undefined;

  return (
    <div className="group relative mx-auto w-full max-w-72 px-8 pt-4">
      {/** Display box which contains the product */}
      {/** Left vertical line of the product box */}
      <VerticalLine
        className={clsx(VERTICAL_LINE_CLASSES, "left-4 ")}
      ></VerticalLine>

      {/** Right vertical line of the product box */}
      <VerticalLine
        className={clsx(VERTICAL_LINE_CLASSES, "right-4 ")}
      ></VerticalLine>

      {/** Top horizontal line of the product box */}
      <HorizontalLine
        className={clsx(HORIZONTAL_LINE_CLASSES, "top-2")}
      ></HorizontalLine>
      <div className="mt-2"></div>
      <div className="flex items-center justify-between ~text-sm/2x1">
        {/** To display the product price */}
        <span>{price}</span>
        {/** To display the star icon and review count */}
        <span className="inline-flex items-center gap-1">
          <FaStar className="text-yellow-400"></FaStar>37
        </span>
      </div>

      {/** Display the product image */}
      <div className="-mb-1 overflow-hidden py-4">
        <Scribble
          className="absolute inset-0 h-full w-full"
          color={dominantColor}
        ></Scribble>
        <PrismicNextImage
          alt=""
          field={product.data.image}
          width={150}
          className="mx-auto w-[58%] origin-top transform-gpu transition-transform 
          duration-500 ease-out group-hover:scale-150"
        ></PrismicNextImage>
      </div>

      {/** Bottom horizontal line of the product box */}
      <HorizontalLine
        className={clsx(HORIZONTAL_LINE_CLASSES)}
      ></HorizontalLine>

      {/** Display the product name */}
      <h3 className="my-2 text-center font-sans leading-tight ~text-lg/xl">
        {product.data.name}
      </h3>

      {/** Customize button */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-0 
      transition-opacity duration-200 group-hover:opacity-100"
      >
        <ButtonLink field={product.data.customizer_link}>Customize</ButtonLink>
      </div>
    </div>
  );
}
