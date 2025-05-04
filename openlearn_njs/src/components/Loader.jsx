import React from "react";
import { Mosaic } from "react-loading-indicators";

export default function Loader() {
    return (
<div className="flex items-center justify-center h-screen">
    <Mosaic color="#ff0000" size="medium" text="" textColor="" />
</div>
    );
};