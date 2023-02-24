import React from "react";
import PhotoGenerator from "../components/PhotoGenerator";

function PhotoGeneratorPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "90vh",
      }}
    >
      <PhotoGenerator style={{ alignSelf: "center" }} />
    </div>
  );
}

export default PhotoGeneratorPage;
