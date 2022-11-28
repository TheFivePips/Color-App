import React from 'react';
import { useParams } from 'react-router';
import Palette from './Palette';
import { generatePalette } from "./colorHelpers";

const PaletteRouteDetails = ({seeds}) => {
    const {id} = useParams()

    const currentPalette = seeds.find(
        seed => seed.id.toLowerCase() === id.toLowerCase()
    )
    return (
        <Palette palette={generatePalette(currentPalette)} />
    );
}

export default PaletteRouteDetails;
