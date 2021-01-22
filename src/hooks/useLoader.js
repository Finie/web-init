import React, { useState } from "react";
import Spinner from "../assets/Loader";

const useLoader = () => {
  const [visible, setVisible] = useState(false);

  const isLoading = () => setVisible(true);
  const hideLoading = () => setVisible(false);

  const Loading = visible ? <Spinner /> : null

  return[ Loading, isLoading, hideLoading]
};

export default useLoader;
