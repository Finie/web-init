import React from "react";
import LoaderIcon from "./LoaderIcon";

import './loader.css'

function Loader() {
  return (
    <div className="spinner">
      <LoaderIcon />
    </div>
  );
}

export default Loader;
