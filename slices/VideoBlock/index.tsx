import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `VideoBlock`.
 */
export type VideoBlockProps = SliceComponentProps<Content.VideoBlockSlice>;

/**
 * Component for "VideoBlock" Slices.
 */
const VideoBlock: FC<VideoBlockProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for video_block (variation: {slice.variation})
      Slices
    </section>
  );
};

export default VideoBlock;
