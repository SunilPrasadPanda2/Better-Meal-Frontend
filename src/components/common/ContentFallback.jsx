import React from "react";
import nodata from "@/assets/images/common/no-data.jpg";

const ContentFallback = () => {
  return (
    <div className="col-lg-12">
      <div className="d-flex-column justify-content-center align-items-center">
        <img src={nodata} alt="" />
        <h4>No data Found !</h4>
      </div>
    </div>
  );
};

export default ContentFallback;
