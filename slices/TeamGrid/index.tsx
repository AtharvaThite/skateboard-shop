import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `TeamGrid`.
 */
export type TeamGridProps = SliceComponentProps<Content.TeamGridSlice>;

/**
 * Component for "TeamGrid" Slices.
 */
const TeamGrid: FC<TeamGridProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for team_grid (variation: {slice.variation}) Slices
    </section>
  );
};

export default TeamGrid;
