import React from "react";
import { useParams } from "react-router";
import SingleColorPalette from "./SingleColorPalette";
import { generatePalette } from "./colorHelpers";

const SCPRouteDetails = ({ seeds }) => {
  const { id, colorId } = useParams();

  const currentPalette = seeds.find(
    (seed) => seed.id.toLowerCase() === id.toLowerCase()
  );
  return <SingleColorPalette palette={generatePalette(currentPalette)} colorId={colorId} />;
};

export default SCPRouteDetails;
