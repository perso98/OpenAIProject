import React from "react";
import PhotoGenerator from "../components/PhotoGenerator";
import "../App.css";
function PhotoGeneratorPage() {
  return (
    <div className="center-div">
      <PhotoGenerator style={{ alignSelf: "center" }} />
    </div>
  );
}

export default PhotoGeneratorPage;
